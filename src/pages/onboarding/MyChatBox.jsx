const MyChatBox = ({text, enabled}) => {
    return (
        <div className="flex justify-end mr-[30px]">
          <div className="h-[37px] px-4 py-2 bg-slate-200">
            {enabled && (
            <div className="text-slate-600 text-sm font-medium font-['Pretendard']">{text}</div>
            )}
            {!enabled && (
            <div className="text-slate-400 text-sm font-medium font-['Pretendard']">{text}</div>
            )}
          </div>
        </div>
    )
}

export default MyChatBox;
