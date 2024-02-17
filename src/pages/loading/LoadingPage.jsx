import Lottie from 'react-lottie';
import animationData from "./loadingLottie"
import { useRef, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';
import { navigate } from 'react-router-dom'
import baseUrl from '../../baseUrl';
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const LoadingPage = () => {
    const query = useQuery();
    const meetUpId = query.get('meetUpId');

    const [isFriendJoined, setIsFriendJoined] = useState(false)

    useEffect(() => {
        const accessToken = Cookies.get('accessToken');
        if (!accessToken) {
            navigate("/onboarding");
            return;
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(async () => {
            const accessToken = Cookies.get('accessToken');
            const response = await fetch(
                `${baseUrl}/api/v1/meet/meet`,
                {
                    headers: { 'Authorization': `Bearer ${accessToken}` },
                }
            );

            if (response && response.status === 200) {
                if (response.headers.get('content-length') === '0' || !response.body) {
                    // Handle empty response body
                    setIsFriendJoined(false);
                } else {
                    setIsFriendJoined(true);
                    clearInterval(interval);
                }
            }
        }, 500);
        return () => clearInterval(interval);
    }, [meetUpId]);

    const lottieRef = useRef(null);

    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    useEffect(() => {
        const anim = lottieRef.current.anim;
        anim.addEventListener('complete', () => {
            const newDirection = anim.playDirection === 1 ? -1 : 1;
            anim.setDirection(newDirection);
            anim.play();
        });
    }, [lottieRef]);

    return (
        <div className='flex items-center justify-center h-full'>
            <div>

                <div className='text-slate-500 text-2xl font-bold text-center'>
                    친구 카드를 만들고 있어요
                </div>

                <div className='' >
                    <Lottie ref={lottieRef} options={defaultOptions} height={300} width={300} isClickToPauseDisabled />
                </div>
            </div>
        </div>
    );
}

export default LoadingPage;