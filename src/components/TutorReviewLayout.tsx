export default function TutorReviewLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 font-sans transform scale-90 transform-origin-center">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
                {children}
            </div>
        </div>
    );
}