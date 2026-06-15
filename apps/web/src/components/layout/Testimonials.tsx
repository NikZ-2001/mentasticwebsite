const testimonials = [
  {
    id: "1",
    name: "Arjun R.",
    location: "Chennai",
    rating: 5,
    comment:
      "Amazing quality for the price. The oversized tee fits perfectly and the fabric is super soft. Will definitely order again!",
  },
  {
    id: "2",
    name: "Karthik M.",
    location: "Coimbatore",
    rating: 5,
    comment:
      "Visited the Anna Nagar stall and was blown away by the collection. Got 3 shirts and all of them look premium. Great brand!",
  },
  {
    id: "3",
    name: "Rahul S.",
    location: "Bangalore",
    rating: 5,
    comment:
      "Fast delivery and the packaging was clean. The cargo pants are exactly as shown. Highly recommend MENTASTIC!",
  },
];

export default function Testimonials() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <p className="text-xs tracking-[0.4em] uppercase text-zinc-400 mb-2">
          What our customers say
        </p>
        <h2 className="text-2xl font-bold tracking-tight">
          Loved by thousands
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-zinc-50 border border-zinc-100 rounded-2xl p-6 flex flex-col gap-4"
          >
            {/* Stars */}
            <div className="flex items-center gap-1">
              {Array.from({ length: t.rating }).map((_, i) => (
                <i key={i} className="bi bi-star-fill text-yellow-400 text-sm"></i>
              ))}
            </div>

            {/* Comment */}
            <p className="text-sm text-gray-600 leading-relaxed">
              "{t.comment}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 mt-auto">
              <div className="w-9 h-9 rounded-full bg-zinc-950 text-white flex items-center justify-center text-sm font-bold">
                {t.name[0]}
              </div>
              <div>
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-gray-400">{t.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}