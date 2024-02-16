import InfoIce from "./InfoIce";
import resetIcon from '../../../static/reset.svg';
import myPageIcon from '../../../static/mypage.svg';

const MyPage = () => {
    return (
        <div>
            <div className="mx-8 my-5 flex items-center gap-1">
                <img src={myPageIcon} />
                <h1 className="text-slate-400 text-l font-bold">나의 TMI</h1>
            </div>
            <div className="flex flex-wrap mx-8 gap-3">
                {
                    ['김와플', '컴퓨터공학부', 'INFP', '김와플', '컴퓨터공학부', 'INFP', '김와플', '컴퓨터공학부', 'INFP'].map((text, index) => (
                        <InfoIce key={index} text={text} />
                    ))
                }
                <button className="inline-flex items-center justify-center px-1 active:scale-90 transition-all active:bg-slate-200 rounded-2xl">
                    <img src={resetIcon} />
                </button>
            </div>
        </div>
    );
}

export default MyPage;