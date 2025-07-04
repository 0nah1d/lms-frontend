export default function UseSearch({ search, setSearch }) {
    return (
        <div className="flex justify-center items-center my-10">
            <label className="input flex items-center gap-2">
                <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                >
                    <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input
                    type="search"
                    required
                    placeholder="Search Book"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="outline-none"
                />
            </label>
        </div>
    )
}
