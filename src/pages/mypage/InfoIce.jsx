import PropTypes from 'prop-types';

const InfoIce = ({ text }) => {
    return (
        <div className='bg-slate-50 rounded sha inline-flex justify-center items-center px-4 py-2 ice-shadow'>
            <h1 className='text-slate-500 text-sm font-medium'>{text}</h1>
        </div>
    );
}

InfoIce.propTypes = {
    text: PropTypes.string.isRequired
};

export default InfoIce;