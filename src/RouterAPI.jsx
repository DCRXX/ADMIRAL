const API_BASE_URL = 'https://kazuyuki07-admiral-form-984f.twc1.net';

console.log('🌐 Дефолтный адрес API:', API_BASE_URL);

/**
 * @returns {Promise<boolean>}
 */
export const checkApiConnection = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (response.ok) {
            console.log('✅ Подключение к API установлено');
            return true;
        } else {
            console.log('❌ API недоступен (статус:', response.status, ')');
            return false;
        }
    } catch (error) {
        console.error('❌ Ошибка подключения к API:', error.message);
        return false;
    }
};

/**
 * Универсальная функция для запросов к API
 * @param {string} endpoint
 * @param {object} options
 */
export const apiRequest = async (endpoint, options = {}) => {
    try {
        const url = `${API_BASE_URL}${endpoint}`;
        console.log('🔗 URL запроса:', url);
        
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        });
        
        console.log('📥 Статус ответа:', response.status);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ Текст ошибки:', errorText);
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('❌ Ошибка запроса:', error);
        throw error;
    }
};

// FAQ
export const sendFAQForm = async (formData) => {
    console.log('📤 Отправка формы:', '/form/send_form');
    
    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    };

    const payload = {
        full_name: formData.full_name,
        birthday: formatDate(formData.birthday), 
        parrents_full_name: formData.parrents_full_name,
        number_phone: formData.number_phone,
        fillial: formData.fillial
    };
    
    return apiRequest('/form/send_form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });
};