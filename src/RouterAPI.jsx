const API_BASE_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY

/**
 * @returns {Promise<boolean>}
 */
export const checkApiConnection = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY
            },
        });
        
        if (response.ok) {
            console.log('Подключение к API установлено');
            return true;
        } else {
            console.log('API недоступен (статус:', response.status, ')');
            return false;
        }
    } catch (error) {
        console.error('Ошибка подключения к API:', error.message);
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

        
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY,
                ...options.headers,
            },
            ...options,
        });
        

        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Текст ошибки:', errorText);
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Ошибка запроса:', error);
        throw error;
    }
};

// FAQ
export const sendFAQForm = async (formData) => {

    
    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    };

    const payload = {
        FIOchildren: formData.FIOchildren,
        ChildDateBirth: formatDate(formData.ChildDateBirth), 
        FIOparent: formData.FIOparent,
        Phone: formData.Phone,
        Branch: formData.Branch
    };
    
    return apiRequest('/public/form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });
};

// aboutUs
export const getAboutUs = async () => {
    try {
        return await apiRequest('/abouUs', { 
            method: 'GET', 
            headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
        },
        });
    } catch (error) {
        console.error('Ошибка получения AboutUs:', error);
        throw error;
    }
};