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
    const [streamJsonData, setStreamJsonData] = useState([]);

    useEffect(() => {
        const accessToken = Cookies.get('accessToken');
        if (!accessToken) {
            navigate("/onboarding");
            return;
        }
    }, []);

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

    useEffect(() => {
        const streamData = async () => {
            const response = await fetch(`${baseUrl}/api/v1/icebreaking/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/stream+json',
                    'Authorization': `Bearer ${Cookies.get('accessToken')}`
                },
                body: JSON.stringify({
                    'id': meetUpId
                })
            });
            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            return reader.read().then(function processText({ done, value }) {
                if (done) {
                    console.log('Stream complete');
                    return;
                }

                const chunk = decoder.decode(value, { stream: true });
                try {
                    const json = JSON.parse(chunk);
                    setStreamJsonData(prevData => [...prevData, json]);
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                }
                return reader.read().then(processText);
            });
        };

        streamData().catch(console.error);
    }, [meetUpId]);

    return (
        <div className='flex items-center justify-center h-full'>
            <div>

                <div className='text-slate-500 text-2xl font-bold text-center'>
                    친구 카드를 만들고 있어요
                </div>

                <div className='' >
                    <Lottie ref={lottieRef} options={defaultOptions} height={300} width={300} isClickToPauseDisabled />
                </div>

                <div>
                    {streamJsonData.map((data, index) => (
                        <div key={index}>
                            {data}
                        </div>
                    ))
                    }
                </div>
            </div>
        </div>
    );
}

export default LoadingPage;