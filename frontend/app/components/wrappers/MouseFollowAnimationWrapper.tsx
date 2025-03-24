import { ReactNode, useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { useMotionValue, useSpring } from "motion/react";
import { motion, useMotionTemplate } from "motion/react";

type MouseFollowAnimationWrapperProps = {
    children: ReactNode;
    gradientColors?: string;
    size?: number;
    className?: string;
};

export default function MouseFollowAnimationWrapper({
    children,
    gradientColors = "from-pink-500 via-purple-500 to-violet-500",
    size = 150,
    className = "",
}: MouseFollowAnimationWrapperProps) {
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        // Detect if the device supports touch
        const isTouch =
            "ontouchstart" in window || navigator.maxTouchPoints > 0;
        setIsTouchDevice(isTouch);
    }, []);

    let mouseX = useMotionValue(-100);
    let mouseY = useMotionValue(-100);

    // Add spring physics for smooth lagging effect
    let springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
    let springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

    function onMouseMove({ currentTarget, clientX, clientY }: any) {
        let { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    let maskImage = useMotionTemplate`radial-gradient(${size}px at ${springX}px ${springY}px, white, transparent)`;

    return (
        <div
            className={cn(
                "group relative h-full w-full overflow-hidden",
                className,
            )}
            onMouseMove={!isTouchDevice ? onMouseMove : undefined}
        >
            {/* Background animation */}
            {!isTouchDevice && (
                <motion.div
                    className={cn(
                        "pointer-events-none absolute inset-0 bg-gradient-to-r",
                        "opacity-0 backdrop-blur-xl transition-opacity duration-500 group-hover:opacity-100",
                        gradientColors,
                    )}
                    style={{
                        maskImage,
                        WebkitMaskImage: maskImage,
                    }}
                />
            )}
            {/* Direct children */}
            <div className="[&>*]:relative">{children}</div>
        </div>
    );
}
