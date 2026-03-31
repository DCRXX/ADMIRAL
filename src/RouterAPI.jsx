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
        ChildDateBirth: formData.ChildDateBirth,
        FIOparent: formData.FIOparent,
        Phone: formData.Phone,
        Branch: formData.Branch
    };
    
    try {
        const response = await apiRequest('/public/form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        
        return response;
    } catch (error) {
        if (error.status === 400 || error.response?.status === 400) {
            let message = 'Неверные данные формы';

            if (error.message && error.message.includes('Телефон должен начинаться')) {
                message = 'Телефон должен начинаться с +7 9 (например: +7 916 123 45 67)';
            } else if (error.message) {
                message = error.message;
            }
            
            const customError = new Error(message);
            customError.status = 400;
            throw customError;
        }
        
        if (error.status === 429 || error.response?.status === 429) {
            const message = error.message || 'Слишком много попыток. Попробуйте через 5 минут.';
            const customError = new Error(message);
            customError.status = 429;
            throw customError;
        }
        
        throw error;
    }
};

{/*
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

// Advantages

export const getAdvantages = async () => {
    try {
        return await apiRequest('/advantages', { method: 'GET', 
            headers: {
            'x-api-key': API_KEY,
        },
        });
    } catch (error) {
        console.error('Ошибка получения Advantages:', error);
        throw error;
    }
};

// Announcements

export const getAdvertisements = async () => {
    try {
        return await apiRequest('/announcements', { method: 'GET',
            headers: {
            'x-api-key': API_KEY,
        },
        });
    } catch (error) {
        console.error('Ошибка получения Advertisements:', error);
        throw error;
    }
};

// FootbalBorders

export const getFootbalBorders = async () => {
    try {
        return await apiRequest('/FootbalBorders', { 
            method: 'GET',
            headers: {
                'x-api-key': API_KEY,
            },
        });
    } catch (error) {
        console.error('Ошибка получения FootbalBorders:', error);
        throw error;
    }
};

// CoachingStaff

export const getCoachingStaff = async () => {
    try {
        return await apiRequest('/CoachingStaff', { 
            method: 'GET',
            headers: {
                'x-api-key': API_KEY,
            },
        });
    } catch (error) {
        console.error('Ошибка получения CoachingStaff:', error);
        throw error;
    }
};

// theFirstStep 

export const getTheFirstStep = async () => {
    try {
        return await apiRequest('/theFirstStep', { 
            method: 'GET',
            headers: {
                'x-api-key': API_KEY,
            },
        });
    } catch (error) {
        console.error('Ошибка получения theFirstStep:', error);
        throw error;
    }
};

// Parentsfc

export const getParentalFc = async () => {
    try {
        return await apiRequest('/parentalFc', { 
            method: 'GET',
            headers: {
                'x-api-key': API_KEY,
            },
        });
    } catch (error) {
        console.error('Ошибка получения ParentalFc:', error);
        throw error;
    }
};

// footer and header

export const getContactDetails = async () => {
    try {
        return await apiRequest('/contactDetails', { 
            method: 'GET',
            headers: {
                'x-api-key': API_KEY,
            },
        });
    } catch (error) {
        console.error('Ошибка получения ContactDetails:', error);
        throw error;
    }
};
*/}