const tabs = ["배경", "템플릿", "텍스트", "스티커", "색상"];
const ratioOptions = ["배경화면", "1:1", "4:5"];

export default function CreateQuoteCardPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col gap-6 bg-[#F9FAFB] px-4 pb-32 pt-10 text-gray-900">
      <header className="flex flex-col gap-1">
        <p className="text-xs font-medium uppercase text-gray-500">
          Quote Builder
        </p>
        <h1 className="text-2xl font-semibold text-gray-900">명언 카드 만들기</h1>
        <p className="text-sm text-gray-500">
          영감을 불러오는 문장을 조합해 나만의 카드를 완성해 보세요.
        </p>
      </header>

      <nav className="flex items-center gap-2 rounded-full bg-white p-1 shadow-sm shadow-gray-200">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            type="button"
            className={`flex-1 rounded-full px-3 py-2 text-sm font-medium ${
              index === 0
                ? "bg-gray-900 text-white"
                : "text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>

      <section className="flex flex-1 flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-gray-200 bg-white/60 p-8 text-center text-sm text-gray-500">
        <div className="rounded-2xl bg-white p-8 shadow-inner shadow-gray-200">
          <p className="text-base font-semibold text-gray-900">
            작업 중인 카드가 여기에 표시됩니다.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            상단 탭에서 요소를 선택해 카드를 구성해 보세요.
          </p>
        </div>
      </section>

      <footer className="mt-auto">
        <div className="flex items-center justify-between rounded-full bg-white px-4 py-3 shadow-lg shadow-gray-200/60">
          <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
            <button
              type="button"
              className="rounded-full px-2 py-1 transition hover:bg-gray-100 hover:text-gray-900"
            >
              취소
            </button>
            <button
              type="button"
              className="rounded-full px-2 py-1 transition hover:bg-gray-100 hover:text-gray-900"
            >
              되돌리기
            </button>
            <button
              type="button"
              className="rounded-full px-2 py-1 transition hover:bg-gray-100 hover:text-gray-900"
            >
              복귀
            </button>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
            {ratioOptions.map((option, index) => (
              <button
                key={option}
                type="button"
                className={`rounded-full px-3 py-1 ${
                  index === 0
                    ? "bg-gray-900 text-white"
                    : "border border-gray-200 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            미리보기
          </button>
        </div>
      </footer>
    </main>
  );
}
