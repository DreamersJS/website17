import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, CardMedia, IconButton, Button, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { createCartService, deleteItemsFromCart, getCartService, updateItemsFromCart } from '../service/cartService';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal]=useState(0);

    const handleFetchCart = async () => {
        const res = await getCartService()
        setCartItems(res.data.formattedItems);
        setTotal(res.data.total);
    }
    useEffect(() => {
        handleFetchCart()
        if (!cartItems) {
            createCartService()
            handleFetchCart()
        }
    }, []);

    const handleRemove = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
        deleteItemsFromCart(id)
    };

    // const handleQuantityChange = (id, delta) => {
    //     setCartItems(cartItems.map(item =>
    //         item.id === id
    //             ? { ...item, quantity: Math.max(1, item.quantity + delta) }
    //             : item
    //     ));
    //     updateItemsFromCart(id)
    // };

    return (
        <Box sx={{ padding: 3, maxWidth: 800, margin: '0 auto' }}>
            <Typography variant="h4" sx={{ mb: 3 }}>Shopping Cart</Typography>

            {cartItems.length === 0 ? (
                <Typography>Your cart is empty.</Typography>
            ) : (
                cartItems.map(item => (
                    <Card key={item.productId} sx={{ display: 'flex', mb: 2, borderRadius: 3, boxShadow: 3 }}>
                        <CardContent sx={{ flex: 1 }}>
                            <Typography variant="h6">{item.name}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                ${item.price.toFixed(2)}
                            </Typography>

                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                {/* <Button size="small" onClick={() => handleQuantityChange(item.productId, -1)}>-</Button>
                                <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                                <Button size="small" onClick={() => handleQuantityChange(item.productId, 1)}>+</Button> */}
                            </Box>
                        </CardContent>

                        <Box sx={{ display: 'flex', alignItems: 'center', pr: 2 }}>
                            <IconButton onClick={() => handleRemove(item.productId)}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', pr: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                                ${item.subtotal}
                            </Typography>
                        </Box>
                    </Card>
                ))
            )}

            {cartItems.length > 0 && (
                <>
                    <Divider sx={{ my: 3 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
                        <Button variant="contained" size="large">
                            Checkout
                        </Button>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default Cart;
