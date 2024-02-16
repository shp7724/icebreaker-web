import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import logo from '../../../static/friend_circle.svg';
import PropTypes from 'prop-types';

const QRCodeBottomSheet = ({ qrCodeUrl }) => {
    const controls = useAnimation();
    const [isExpanded, setIsExpanded] = useState(false);

    const sheetVariants = {
        initial: { y: '100%', height: 150 },
        expanded: { y: '0%', height: 500 },
        collapsed: { y: '0%', height: 150 },
    };

    const sheetContentVariants = {
        initial: { opacity: 0 },
        expanded: { opacity: 1, scale: 1.2, y: 50 },
        collapsed: { opacity: 1, scale: 1, y: 0 },
    };

    const qrCodeVariants = {
        initial: { opacity: 0 },
        expanded: { opacity: 1, scale: 1 },
        collapsed: { opacity: 0, scale: 0.8 },
    };

    useEffect(() => {
        if (qrCodeUrl) {
            controls.start('collapsed');
        }
    }, [controls, qrCodeUrl]);

    const toggleExpanded = async () => {
        await controls.start(isExpanded ? 'collapsed' : 'expanded');
        setIsExpanded(!isExpanded);
    };

    const transition = { type: 'spring', stiffness: 80, damping: 15 };

    return (
        <motion.div
            initial="initial"
            animate={controls}
            variants={sheetVariants}
            transition={transition}
            className="fixed inset-x-0 bottom-0 bg-white rounded-t-3xl shadow-lg overflow-hidden"
            onClick={toggleExpanded}
        >
            <motion.div
                className=""
                variants={sheetContentVariants}
                transition={transition}
            >
                <div className="flex flex-col justify-center items-center pt-4">
                    <img src={logo} alt="Logo" className="h-16" />
                    <h1 className="text-slate-500 text-xl font-bold">친구를 만날까요?</h1>
                    <motion.div variants={qrCodeVariants} transition={transition}>
                        <img src={qrCodeUrl} alt="QR Code" className="h-36 w-36 mt-8" />
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
};

QRCodeBottomSheet.propTypes = {
    qrCodeUrl: PropTypes.string.isRequired,
};

export default QRCodeBottomSheet;
