export const createCartService = async () => {
    const res = await fetch('api/cart/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            productId,
            quantity
        }),
        credentials: 'include',
    })
    if (!res.ok) {
        throw new Error('Cart creation failed')
    }
    const data = await res.json();
    return data;
}

export const getCartService = async () => {
    const res = await fetch(`api/cart/get`, {
        method: 'GET',
        credentials: "include"
    })
    if (!res.ok) {
        throw new Error('No cart found')
    }
    const data = await res.json()
    return data;
}

export const deleteCartService = async () => {
    const res = await fetch(`/api/cart/delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
    if (!res.ok) throw new Error('delete cart request failed');
    const data = await res.json();
    return data.message;
};

export const addItemsToCart = async (productId, quantity = 1) => {
    const res = await fetch('/api/cart/items', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            productId,
            quantity
        }),
        credentials: 'include'
    })
    if (!res.ok) {
        throw new Error('Adding item in cart failed')
    }
    const data = await res.json();
    return data;
}

export const deleteItemsFromCart = async (id) => {
    const res = await fetch(`api/cart/items/${id}`, {
        method: 'DELETE',
        credentials: 'include'
    })
    if (!res.ok) {
        throw new Error('Delete item from cart failed')
    }
    const data = res.json();
    return data;
}
export const updateItemsFromCart = async (id) => {
    const res = await fetch(`api/cart/items/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            productId,
            quantity
        }),
        credentials: 'include'
    })
    if (!res.ok) {
        throw new Error('Delete item from cart failed')
    }
    const data = res.json();
    return data;
}

// What if user adds same product twice?
// What if product is out of stock?
// What if user is not logged in?
// If I refresh → cart still there