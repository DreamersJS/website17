import useScreenSize from "../../hooks/useScreenSize";

const ResponsiveComponent = ({children}) => {
    const { width, height } = useScreenSize();

    if (typeof children !== 'function') {
        console.error('ResponsiveComponent: children must be a function');
        return null;
    }
    if (width === null || height === null) {
        return <p>Loading screen dimensions...</p>;
    }
    
    return (
        <>
            {children({ width, height })}
        </>
    );
};
export default ResponsiveComponent;