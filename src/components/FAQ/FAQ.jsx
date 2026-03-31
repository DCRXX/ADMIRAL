import { useState, useEffect } from 'react';
import './FAQ.css'
import arrow from './public/arrow.svg'
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { checkApiConnection, sendFAQForm } from '../../RouterAPI';
import { useScrollAnimation } from '../../useScrollAnimation.js'; 

const MapComponent = ({ branches, selectedBranch, mapCenter }) => (
    <YMaps>
        <Map
            state={{ center: mapCenter, zoom: 11 }}
            width="100%"
            height="100%"
        >
            {branches.map((branch) => (
                <Placemark
                    key={branch.id}
                    geometry={branch.coords}
                    properties={{
                        hintContent: branch.name,
                        balloonContent: branch.name
                    }}
                    options={{
                        preset: selectedBranch === branch.name
                            ? 'islands#redDotIcon'
                            : 'islands#blueDotIcon'
                    }}
                />
            ))}
        </Map>
    </YMaps>
);

export default function FAQ() {
    const [FIOchildren, setFIOchildren] = useState('');
    const [ChildDateBirth, setChildDateBirth] = useState('');
    const [FIOparent, setFIOparent] = useState('');
    const [Phone, setPhone] = useState('');
    const [selectedBranch, setSelectedBranch] = useState('');

    const [errors, setErrors] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
    const [isConnected, setIsConnected] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [showRateLimitModal, setShowRateLimitModal] = useState(false);
    const [rateLimitMessage, setRateLimitMessage] = useState('');

    const [aboutData, setAboutData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const sectionRef = useScrollAnimation([isLoading, aboutData]);

    useEffect(() => {
        const checkConnection = async () => {
            const connected = await checkApiConnection();
            setIsConnected(connected);
        };
        checkConnection();
    }, []);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 750);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const branches = [
        { id: 1, name: 'Москва, Затонная, 22', coords: [55.674184, 37.687982] },
        { id: 2, name: 'Москва, Новинки, 8', coords: [55.675986, 37.670528] },
        { id: 3, name: 'Москва, Судостроительная улица, 46с1', coords: [55.686863, 37.694405] },
        { id: 4, name: 'Москва, Стадион Огонёк', coords: [55.610774, 37.668475] },
    ];

    const selectedBranchData = branches.find(b => b.name === selectedBranch);

    const formatPhone = (value) => {
        let digits = value.replace(/[^\d+]/g, '');
        
        if (digits.startsWith('8') && digits.length === 11) {
            digits = '+7' + digits.slice(1);
        }
        
        if (digits.startsWith('7') && !digits.startsWith('+7')) {
            digits = '+7' + digits.slice(1);
        }
        
        if (digits.length === 0 || digits === '+') return '+7';
        
        let cleanDigits = digits.replace(/\D/g, '');
        if (cleanDigits.startsWith('7')) {
            cleanDigits = cleanDigits.slice(1);
        }
        
        let formatted = '+7';
        if (cleanDigits.length > 0) formatted += ' ' + cleanDigits.slice(0, 3);
        if (cleanDigits.length > 3) formatted += ' ' + cleanDigits.slice(3, 6);
        if (cleanDigits.length > 6) formatted += ' ' + cleanDigits.slice(6, 8);
        if (cleanDigits.length > 8) formatted += ' ' + cleanDigits.slice(8, 10);
        
        return formatted;
    };

    const handlePhoneChange = (e) => {
        const formatted = formatPhone(e.target.value);
        setPhone(formatted);
        if (errors.phone) {
            setErrors(prev => ({ ...prev, phone: '' }));
        }
    };

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSelectBranch = (branch) => {
        setSelectedBranch(branch);
        setIsOpen(false);
        if (errors.branch) {
            setErrors(prev => ({ ...prev, branch: '' }));
        }
    };

    const parseDateInput = (value) => {
        const digits = value.replace(/\D/g, '').slice(0, 8);
        
        if (digits.length === 0) return '';
        
        let day = digits.slice(0, 2);
        let month = digits.slice(2, 4);
        let year = digits.slice(4, 8);
        
        if (day.length === 1 && parseInt(day) > 3) day = '0' + day;
        if (month.length === 1 && parseInt(month) > 1) month = '0' + month;
        
        let result = day;
        if (month) result += '.' + month;
        if (year) result += '.' + year;
        
        return result;
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!FIOchildren.trim()) {
            newErrors.fioChildren = 'ФИО ребенка не заполнено';
        }
        
        if (!ChildDateBirth) {
            newErrors.childDateBirth = 'Дата рождения не выбрана';
        } else {
            const dateRegex = /^(\d{2})\.(\d{2})\.(\d{4})$/;
            if (!dateRegex.test(ChildDateBirth)) {
                newErrors.childDateBirth = 'Введите дату в формате';
            } else {
                const [, day, month, year] = ChildDateBirth.match(dateRegex);
                const date = new Date(year, month - 1, day);
                const now = new Date();
                if (date > now) {
                    newErrors.childDateBirth = 'Дата не может быть в будущем';
                }
            }
        }
        
        if (!FIOparent.trim()) {
            newErrors.fioParent = 'ФИО родителя не заполнено';
        }
        
        const phoneDigits = Phone.replace(/\D/g, '');
        
        if (phoneDigits.length !== 11) {
            newErrors.phone = 'Телефон должен содержать 11 цифр (пример: +7 999 999 99 99)';
        } else if (!Phone.startsWith('+7')) {
            newErrors.phone = 'Телефон должен начинаться с +7';
        } else if (phoneDigits[1] !== '9') {
            newErrors.phone = 'Телефон должен начинаться с +7 9 (например: +7 916 123 45 67)';
        }
        
        if (!selectedBranch) {
            newErrors.branch = 'Филиал не выбран';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        
        if (!validateForm()) {
            return;
        }

        const formData = {
            FIOchildren: FIOchildren.trim(),
            ChildDateBirth: ChildDateBirth,
            FIOparent: FIOparent.trim(),
            Phone: Phone,
            Branch: selectedBranch
        };

        setIsSubmitting(true);

        try {
            await sendFAQForm(formData);
            setFIOchildren('');
            setChildDateBirth('');
            setFIOparent('');
            setPhone('');
            setSelectedBranch('');
            setErrors({});
        } catch (error) {
            if (error.status === 429 || error.message.includes('429') || error.message.includes('слишком много')) {
                setRateLimitMessage(error.message || 'Слишком много попыток. Попробуйте через 5 минут.');
                setShowRateLimitModal(true);
            } else if (error.status === 400 || error.message.includes('Телефон должен начинаться')) {
                setErrors(prev => ({ 
                    ...prev, 
                    phone: 'Телефон должен начинаться с +7 9 (например: +7 916 123 45 67)' 
                }));
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const mapCenter = selectedBranchData?.coords || [55.657702, 37.669949];

    return (
        <section className='FAQ' ref={sectionRef}>
            <div className='main-block'>
                <form className='write_block' onSubmit={handleSubmit} noValidate autoComplete="off">
                    <div className='write_header'>
                        <h1>Присоединяйся к нам!</h1>
                    </div>

                    <div className={`input-group ${errors.fioChildren ? 'error' : ''}`}>
                        <input
                            id="fioChildren"
                            name="fioChildren"
                            className='FIO_children'
                            type='text'
                            placeholder='ФИО ребенка*'
                            value={FIOchildren}
                            onChange={(e) => {
                                setFIOchildren(e.target.value);
                                if (errors.fioChildren) {
                                    setErrors(prev => ({ ...prev, fioChildren: '' }));
                                }
                            }}
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="words"
                        />
                        {errors.fioChildren && <span className="error-message">{errors.fioChildren}</span>}
                    </div>

                    <div className={`input-group ${errors.childDateBirth ? 'error' : ''}`}>
                        <label className='Date_of_birth_label' htmlFor="dateOfBirth">
                            Дата рождения ребенка* (ДД.ММ.ГГГГ)
                        </label>
                        <input
                            id="dateOfBirth"
                            name="dateOfBirth"
                            className='Date_of_birth'
                            type='text'
                            inputMode="numeric"
                            placeholder='ДД.ММ.ГГГГ'
                            value={ChildDateBirth}
                            onChange={(e) => {
                                const formatted = parseDateInput(e.target.value);
                                setChildDateBirth(formatted);
                                if (errors.childDateBirth) {
                                    setErrors(prev => ({ ...prev, childDateBirth: '' }));
                                }
                            }}
                            maxLength={10}
                            autoComplete="off"
                        />
                        {errors.childDateBirth && <span className="error-message">{errors.childDateBirth}</span>}
                    </div>

                    <div className={`input-group ${errors.fioParent ? 'error' : ''}`}>
                        <input
                            id="fioParent"
                            name="fioParent"
                            className='FIO_parent'
                            type='text'
                            placeholder='ФИО родителя*'
                            value={FIOparent}
                            onChange={(e) => {
                                setFIOparent(e.target.value);
                                if (errors.fioParent) {
                                    setErrors(prev => ({ ...prev, fioParent: '' }));
                                }
                            }}
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="words"
                        />
                        {errors.fioParent && <span className="error-message">{errors.fioParent}</span>}
                    </div>

                    <div className={`input-group ${errors.phone ? 'error' : ''}`}>
                        <input
                            id="phone"
                            name="phone"
                            className='Phone_number'
                            type='tel'
                            inputMode="tel"
                            value={Phone}
                            onChange={handlePhoneChange}
                            placeholder='+7 999 999 99 99'
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="none"
                            spellCheck="false"
                        />
                        {errors.phone && <span className="error-message">{errors.phone}</span>}
                    </div>

                    <div className={`input-group ${errors.branch ? 'error' : ''}`}>
                        <div className={`branch-wrapper ${isOpen ? 'open' : ''}`}>
                            <div className='branch' onClick={toggleDropdown}>
                                <p>{selectedBranch || 'Выберите филиал*'}</p>
                                <img src={arrow} className={isOpen ? 'rotate' : ''} alt="arrow" />
                            </div>
                            <div className={`dropdown-list ${isOpen ? 'active' : ''}`}>
                                {branches.map((branch) => (
                                    <p key={branch.id} onClick={() => handleSelectBranch(branch.name)}>
                                        {branch.name}
                                    </p>
                                ))}
                            </div>
                        </div>
                        {errors.branch && <span className="error-message">{errors.branch}</span>}
                    </div>

                    <button
                        className='submitting_the_form'
                        type='submit'
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? <p>Отправка...</p> : <p>Записаться на пробное занятие</p>}
                    </button>
                </form>

                {!isMobile && (
                    <div className='map_block'>
                        <MapComponent
                            branches={branches}
                            selectedBranch={selectedBranch}
                            mapCenter={mapCenter}
                        />
                    </div>
                )}
            </div>

            {isMobile && (
                <div className='map_block mobile-map'>
                    <MapComponent
                        branches={branches}
                        selectedBranch={selectedBranch}
                        mapCenter={mapCenter}
                    />
                </div>
            )}

            {showRateLimitModal && (
                <div className="modal-overlay" onClick={() => setShowRateLimitModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Слишком много попыток</h3>
                            <button className="modal-close" onClick={() => setShowRateLimitModal(false)}>×</button>
                        </div>
                        <div className="modal-body">
                            <p>{rateLimitMessage}</p>
                            <p className="modal-hint">Пожалуйста, подождите 5 минут перед следующей попыткой.</p>
                        </div>
                        <div className="modal-footer">
                            <button className="modal-btn" onClick={() => setShowRateLimitModal(false)}>
                                Понятно
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}