"use client";

export default function OrderMap() {
  return (
    <iframe
      title="Order map"
      src="https://www.openstreetmap.org/export/embed.html?bbox=30.4234%2C50.4101%2C30.6234%2C50.4901&layer=mapnik&marker=50.4501%2C30.5234"
      style={{ width: "100%", height: 220, border: 0, borderRadius: 12 }}
      loading="lazy"
    />
  );
}
