import prisma from '../config/prisma.js';

export const changeUserRole = async (req, res) => {
    const { userId } = req.params;
    const { role } = req.body;

    try {
        await prisma.user.update({
            where: { id: userId },
            data: { role },
        });
        res.status(200).json({ message: 'Role updated successfully' });
    } catch (error) {
        console.error('Error updating role:', error);
        res.status(500).json({ error: 'Failed to update role' });
    }
};

export const blockUser = async (req, res) => {
    const { userId } = req.params;

    try {
        // Get the current user's block status from the database
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Toggle the block status
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                isBlocked: !user.isBlocked, 
            },
        });

        res.status(200).json(updatedUser); // Send back the updated user
    } catch (error) {
        console.error("Error toggling block status:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

