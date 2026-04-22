import { useState } from 'react';

export default function ShopsList({ onSelectShop, onBack }) {
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [showImagesModal, setShowImagesModal] = useState(false);
  const [menuShop, setMenuShop] = useState(null);
  const [imagesShop, setImagesShop] = useState(null);

  const shops = [
    {
      id: 1,
      name: 'Sadhana Chulivarchi Misal',
      location: 'Gangapur Road, Nashik',
      rating: 4.5,
      reviews: 98,
      emoji: '🏪',
      status: 'OPEN',
      statusColor: 'bg-green-500',
      menuImage: `📋 Menu: Traditional Misal Varieties
- Kolhapuri Misal
- Nashik Misal
- Spicy Misal Mix`,
      shopImages: [
        '🖼️ Image 1: Restaurant Front',
        '🖼️ Image 2: Interior',
        '🖼️ Image 3: Dishes',
      ],
    },
    {
      id: 2,
      name: 'Tushar Misal',
      location: 'Canada Corner, Nashik',
      rating: 4.7,
      reviews: 145,
      emoji: '🍛',
      status: 'OPEN',
      statusColor: 'bg-green-500',
      menuImage: `📋 Menu: Premium Misal
- Executive Misal
- Butter Misal
- Special Mix`,
      shopImages: [
        '🖼️ Image 1: Shop Front',
        '🖼️ Image 2: Seating Area',
        '🖼️ Image 3: Food Display',
      ],
    },
    {
      id: 3,
      name: 'Hotel Vihar',
      location: 'Shreerang Nagar, Nashik',
      rating: 4.2,
      reviews: 78,
      emoji: '🏨',
      status: 'CLOSED',
      statusColor: 'bg-red-500',
      menuImage: `📋 Menu: Regular Misal
- Basic Misal
- Masala Misal
- Comfort Mix`,
      shopImages: [
        '🖼️ Image 1: Hotel View',
        '🖼️ Image 2: Dining Hall',
        '🖼️ Image 3: Menu Display',
      ],
    },
  ];

  const handleGetDirections = (shop, e) => {
    e.stopPropagation();
    const url = `https://www.google.com/maps/search/${shop.name}+${shop.location}`;
    window.open(url, '_blank');
  };

  const handleScanQR = (e) => {
    e.stopPropagation();
    onSelectShop({ qrScan: true });
  };

  const openMenuModal = (shop, e) => {
    e.stopPropagation();
    setMenuShop(shop);
    setShowMenuModal(true);
  };

  const openImagesModal = (shop, e) => {
    e.stopPropagation();
    setImagesShop(shop);
    setShowImagesModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 pb-8">

      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 sticky top-0 z-10 rounded-b-3xl shadow-lg">
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <h1 className="text-3xl font-black">🍛 Select Shop</h1>
            <p className="text-orange-100 text-sm font-semibold">
              Choose your favorite misal place
            </p>
          </div>

          <button
            onClick={handleScanQR}
            className="bg-white text-orange-600 p-3 rounded-full text-2xl hover:scale-110 transition"
          >
            📷
          </button>
        </div>
      </div>

      {/* Shop List */}
      <div className="max-w-2xl mx-auto p-4 space-y-4">
        {shops.map((shop) => (
          <div
            key={shop.id}
            className="rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition transform hover:scale-105 border-4 border-orange-200 bg-white"
          >
            <div className="p-6">

              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4 items-center">
                  <div className="text-4xl">{shop.emoji}</div>
                  <div>
                    <h2 className="text-2xl font-black text-gray-800">
                      {shop.name}
                    </h2>
                    <p className="text-xs text-gray-600">
                      Traditional Misal
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-bold text-orange-600">
                    {shop.rating}⭐
                  </p>
                  <p className="text-xs text-gray-600">
                    {shop.reviews} reviews
                  </p>
                </div>
              </div>

              {/* Status */}
              <div className="mb-4">
                <span className={`${shop.statusColor} text-white px-4 py-2 rounded-lg text-sm font-bold`}>
                  {shop.status === 'OPEN' ? '🟢 OPEN' : '🔴 CLOSED'}
                </span>
              </div>

              {/* Location */}
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-xl">
                <p className="text-blue-700 text-sm font-semibold">
                  📍 {shop.location}
                </p>
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={(e) => openMenuModal(shop, e)}
                  className="bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg text-sm font-bold"
                >
                  📋 Menu
                </button>

                <button
                  onClick={(e) => openImagesModal(shop, e)}
                  className="bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg text-sm font-bold"
                >
                  🖼️ Images
                </button>

                <button
                  onClick={(e) => handleGetDirections(shop, e)}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-sm font-bold"
                >
                  🗺️ Map
                </button>
              </div>

              {/* Info */}
              <p className="text-center text-xs text-gray-500 mt-4">
                ℹ️ View details using buttons above
              </p>

            </div>
          </div>
        ))}
      </div>

      {/* Back Button */}
      <div className="max-w-2xl mx-auto px-4 mt-4">
        <button
          onClick={onBack}
          className="w-full bg-gray-400 hover:bg-gray-500 text-white py-3 rounded-xl font-bold"
        >
          ← BACK
        </button>
      </div>

      {/* MENU MODAL */}
      {showMenuModal && menuShop && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{menuShop.name} Menu</h2>
            <pre className="whitespace-pre-line">{menuShop.menuImage}</pre>
            <button
              onClick={() => setShowMenuModal(false)}
              className="mt-4 w-full bg-purple-500 text-white py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* IMAGES MODAL */}
      {showImagesModal && imagesShop && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{imagesShop.name} Images</h2>
            {imagesShop.shopImages.map((img, i) => (
              <p key={i}>{img}</p>
            ))}
            <button
              onClick={() => setShowImagesModal(false)}
              className="mt-4 w-full bg-pink-500 text-white py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}