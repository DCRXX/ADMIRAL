import { useState, useEffect } from 'react';  // Добавь useEffect
import './FAQ.css'
import arrow from './public/arrow.svg'
import { YMaps, Map, Placemark, ZoomControl } from '@pbe/react-yandex-maps';

export default function FAQ() {
    const [phone, setPhone] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedBranch, setSelectedBranch] = useState('');
    const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 750);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const branches = [
        { id: 1, name: 'Москва, Затонная улица, 22', coords: [55.674184, 37.687982] },
        { id: 2, name: 'Москва, улица Новинки, 8', coords: [55.675986, 37.670528] },
        { id: 3, name: 'Москва, Судостроительная улица, 46с1', coords: [55.686863, 37.694405] },
        { id: 4, name: 'Москва, Судостроительная, 48', coords: [55.688228, 37.695169] },
        { id: 5, name: 'Москва, Спортивная, вл 2', coords: [55.610006, 37.667932] },
        { id: 6, name: 'Москва, Судостроительная 32к3', coords: [55.682153, 37.687695] },
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

    const mapCenter = selectedBranchData?.coords || [55.686863, 37.694405];

    const MapComponent = () => (
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

    return (
        <section className='FAQ'>
            <div className='main-block'>
                <div className='write_block'>
                    <div className='write_header'>
                        <h1>Присоединяйся к нам!</h1>
                    </div>
                    <input
                        className='FIO_children'
                        type='text'
                        placeholder='ФИО ребенка*'
                        required
                    />
                    <div className='DATA'>
                        <label className='Date_of_birth_label'>Дата рождения ребенка*</label>
                        <input
                            className='Date_of_birth'
                            type='date'
                            required
                        />
                    </div>
                    <input
                        className='FIO_parent'
                        type='text'
                        placeholder='ФИО родителя*'
                        required
                    />
                    <input
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
                    <input
                        className='submitting_the_form'
                        type='submit'
                        value='Записаться на первое занятие'
                    />
                </div>
                
                {/* Карта внутри main-block только на десктопе */}
                {!isMobile && (
                    <div className='map_block'>
                        <MapComponent />
                    </div>
                )}
            </div>
            
            {/* Карта под main-block только на мобильном */}
            {isMobile && (
                <div className='map_block mobile-map'>
                    <MapComponent />
                </div>
            )}
        </section>
    )
}