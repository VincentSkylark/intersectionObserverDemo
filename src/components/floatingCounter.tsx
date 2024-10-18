interface Props {
    count: number;
}

const FloatingCounter = ({ count }: Props) => {
    return (
        <div className="floating-counter">
            event triggered {count} times
        </div>
    );
};

export { FloatingCounter };