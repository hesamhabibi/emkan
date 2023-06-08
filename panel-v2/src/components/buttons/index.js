import LinkButton from './LinkButton';
import Button from './Button';

const Index = (props) => {
    const {href} = props;

    return (
        <>
            {(href && href?.length > 0) ? <LinkButton {...props}/> : <Button {...props}/>}
        </>
    )
}

export default Index