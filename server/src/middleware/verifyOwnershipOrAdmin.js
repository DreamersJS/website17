export const verifyOwnershipOrAdmin = (req, res, next) => {
    if (
        req.user.userId !== req.params.id &&
        req.user.role !== 'ADMIN'
    ) {
        return next(new AppError('Unauthorized', 403));
    }

    next();
};