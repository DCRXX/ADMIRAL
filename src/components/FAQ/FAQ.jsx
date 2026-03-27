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

    const [isFocused, setIsFocused] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
    const [isConnected, setIsConnected] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        const digits = value.replace(/\D/g, '');
        if (digits.length === 0) return '+7';
        if (digits.length === 1 && digits === '7') return '+7';
        const withoutSeven = digits.startsWith('7') ? digits.slice(1) : digits;
        let formatted = '+7';
        if (withoutSeven.length > 0) formatted += ' ' + withoutSeven.slice(0, 3);
        if (withoutSeven.length > 3) formatted += ' ' + withoutSeven.slice(3, 6);
        if (withoutSeven.length > 6) formatted += ' ' + withoutSeven.slice(6, 8);
        if (withoutSeven.length > 8) formatted += ' ' + withoutSeven.slice(8, 10);
        return formatted;
    };

    const handleChange = (e) => {
        const formatted = formatPhone(e.target.value);
        setPhone(formatted);
    };

    const handleBlur = () => {
        setIsFocused(false);
        if (phone === '+7') setPhone('');
    };

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSelectBranch = (branch) => {
        setSelectedBranch(branch);
        setIsOpen(false);
    };

    const validateForm = () => {
        const errors = [];
        if (!FIOchildren.trim()) errors.push('ФИО ребенка не заполнено');
        if (!ChildDateBirth) errors.push('Дата рождения не выбрана');
        if (!FIOparent.trim()) errors.push('ФИО родителя не заполнено');
        const phoneDigits = Phone.replace(/\D/g, '');
        if (phoneDigits.length !== 11) errors.push('Номер телефона неполный');
        if (!selectedBranch) errors.push('Филиал не выбран');
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Начало отправки формы...');

        const errors = validateForm();
        if (errors.length > 0) {
            console.error('Ошибки валидации:', errors);
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
            const result = await sendFAQForm(formData);
            console.log('Форма успешно отправлена!');
            setFIOchildren('');
            setChildDateBirth('');
            setFIOparent('');
            setPhone('');
            setSelectedBranch('');
        } catch (error) {
            console.error('Ошибка:', error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const mapCenter = selectedBranchData?.coords || [55.657702, 37.669949];

    return (
        <section className='FAQ' ref={sectionRef}>
            <div className='main-block'>
                <form className='write_block' onSubmit={handleSubmit}>
                    <div className='write_header'>
                        <h1>Присоединяйся к нам!</h1>
                    </div>

                    <input
                        id="fioChildren"
                        name="fioChildren"
                        className='FIO_children'
                        type='text'
                        placeholder='ФИО ребенка*'
                        value={FIOchildren}
                        onChange={(e) => setFIOchildren(e.target.value)}
                        required
                    />

                    <div className='DATA'>
                        <label className='Date_of_birth_label' htmlFor="dateOfBirth">
                            Дата рождения ребенка*
                        </label>
                        <input
                            id="dateOfBirth"
                            name="dateOfBirth"
                            className='Date_of_birth'
                            type='date'
                            value={ChildDateBirth}
                            onChange={(e) => {
                                const val = e.target.value;
                                if (val === '' || /^\d{0,4}-?\d{0,2}-?\d{0,2}$/.test(val)) {
                                    setChildDateBirth(val);
                                }
                            }}
                            onKeyDown={(e) => {
                                const allowed = ['Backspace','Delete','Tab','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','-','/'];
                                if (!allowed.includes(e.key) && !/^\d$/.test(e.key)) {
                                    e.preventDefault();
                                }
                            }}
                            max={new Date().toISOString().split('T')[0]}
                            required
                        />
                    </div>

                    <input
                        id="fioParent"
                        name="fioParent"
                        className='FIO_parent'
                        type='text'
                        placeholder='ФИО родителя*'
                        value={FIOparent}
                        onChange={(e) => setFIOparent(e.target.value)}
                        required
                    />

                    <input
                        id="phone"
                        name="phone"
                        className='Phone_number'
                        type='tel'
                        value={Phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder='Номер телефона*'
                        required
                    />

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
        </section>
    );
}