export default function Footer() {
  return (
    <footer className="bg-black text-white mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">

        {/* BRAND */}
        <div>
          <h2 className="text-xl font-bold">
            EcomSaaS
          </h2>
          <p className="text-gray-400 mt-2 text-sm">
            Build, scale and manage your ecommerce business with ease.
          </p>
        </div>

        {/* LINKS */}
        <div>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="/products">Products</a></li>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/admin">Admin</a></li>
          </ul>
        </div>

        {/* CTA */}
        <div>
          <h3 className="font-semibold mb-3">
            Start Selling Today
          </h3>
          <a
            href="/products"
            className="inline-block bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition"
          >
            Get Started
          </a>
        </div>

      </div>

      <div className="text-center text-gray-500 text-sm pb-6">
        © {new Date().getFullYear()} EcomSaaS. All rights reserved.
      </div>
    </footer>
  );
}