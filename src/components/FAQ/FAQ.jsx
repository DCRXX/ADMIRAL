import { useState, useEffect } from 'react';
import './FAQ.css'
import arrow from './public/arrow.svg'
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { checkApiConnection, sendFAQForm } from '../../RouterAPI';


const MapComponent = ({ branches, selectedBranch, mapCenter }) => (
    <YMaps>
        <Map
            state={{ center: mapCenter, zoom: 14 }}
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
    const [fioChildren, setFioChildren] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [fioParent, setFioParent] = useState('');
    const [phone, setPhone] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedBranch, setSelectedBranch] = useState('');
    const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
    const [isConnected, setIsConnected] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        if (!fioChildren.trim()) errors.push('ФИО ребенка не заполнено');
        if (!dateOfBirth) errors.push('Дата рождения не выбрана');
        if (!fioParent.trim()) errors.push('ФИО родителя не заполнено');
        const phoneDigits = phone.replace(/\D/g, '');
        if (phoneDigits.length !== 11) errors.push('Номер телефона неполный');
        if (!selectedBranch) errors.push('Филиал не выбран');
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('🚀 Начало отправки формы...');

        const errors = validateForm();
        if (errors.length > 0) {
            console.error('❌ Ошибки валидации:', errors);
            return;
        }

        const formData = {
            full_name: fioChildren.trim(),
            birthday: dateOfBirth,
            parrents_full_name: fioParent.trim(),
            number_phone: phone,
            fillial: selectedBranch
        };

        setIsSubmitting(true);

        try {
            const result = await sendFAQForm(formData);
            console.log('✅ Форма успешно отправлена!', result);
            setFioChildren('');
            setDateOfBirth('');
            setFioParent('');
            setPhone('');
            setSelectedBranch('');
        } catch (error) {
            console.error('❌ Ошибка:', error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const mapCenter = selectedBranchData?.coords || [55.686863, 37.694405];

    return (
        <section className='FAQ'>
            <div className='main-block'>
                <form className='write_block' onSubmit={handleSubmit}>
                    <div className='write_header'>
                        <h1>Присоединяйся к нам!</h1>
                    </div>

                    {/* ✅ Добавлены id и name — исправляет предупреждения об accessibility */}
                    <input
                        id="fioChildren"
                        name="fioChildren"
                        className='FIO_children'
                        type='text'
                        placeholder='ФИО ребенка*'
                        value={fioChildren}
                        onChange={(e) => setFioChildren(e.target.value)}
                        required
                    />

                    <div className='DATA'>
                        {/* ✅ htmlFor связывает label с input */}
                        <label className='Date_of_birth_label' htmlFor="dateOfBirth">
                            Дата рождения ребенка*
                        </label>
                        <input
                            id="dateOfBirth"
                            name="dateOfBirth"
                            className='Date_of_birth'
                            type='date'
                            value={dateOfBirth}
                            onChange={(e) => {
                                const val = e.target.value;
                                // Принимаем только формат YYYY-MM-DD
                                if (val === '' || /^\d{0,4}-?\d{0,2}-?\d{0,2}$/.test(val)) {
                                    setDateOfBirth(val);
                                }
                            }}
                            onKeyDown={(e) => {
                                // Блокируем ввод букв в Safari
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
                        value={fioParent}
                        onChange={(e) => setFioParent(e.target.value)}
                        required
                    />

                    <input
                        id="phone"
                        name="phone"
                        className='Phone_number'
                        type='tel'
                        value={phone}
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