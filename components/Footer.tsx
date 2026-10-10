export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="site-container flex min-h-[69px] flex-col justify-center gap-3 py-5 text-sm md:flex-row md:items-center md:justify-between">
        <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
        <p className="text-muted">সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
      </div>
    </footer>
  );
}
