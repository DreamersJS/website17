export const checkDomain = async (email) => {
    try {
        const response = await fetch('/api/email/checkDomain', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email}),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error checking domain MX records:', error);
        throw error;
    }
}

export const emailSendConfirmationEmail = async (email) => {
    try {
        const response = await fetch('/api/email/sendConfirmationEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error sending confirmation email:', error);
        throw error;
    }
}

export const emailSendMsg = async (name, email, phone, message) => {
    try {
        const response = await fetch('/api/email/sendMsg', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, email, phone, message }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
}

/**
 * 
 * @param {*} email 
 * @returns  return res.status(200).json({
            message: 'Email confirmed successfully. You may now send your message.',
            confirmed: true,
            email
        });
 */
export const checkEmailConfirmed = async(email)=>{
    try {
        const response = await fetch(`/api/email/isConfirmed?email=${encodeURIComponent(email)}`,{
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error isConfirmed:', error);
        throw error;
    }
}