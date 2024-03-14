// components/FadingImage.js
'use client'
import { useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const FadingImage = ({ src, alt, width, height, style, className }) => {
    // No need for state or custom IntersectionObserver. `whileInView` will handle it.
    
    const fadeIn = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    };

    return (
        <motion.div
            className={className}
            initial='hidden'
            whileInView='visible'
            variants={fadeIn}
            viewport={{ once: true, }}
        >
            <Image src={src} quality={65} style={style} alt={alt} width={width} height={height} />
        </motion.div>
    );
};

export default FadingImage;
