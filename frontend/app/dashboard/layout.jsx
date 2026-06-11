export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#FAF8F5] [&_a]:cursor-pointer [&_button]:cursor-pointer [&_label]:cursor-pointer [&_select]:cursor-pointer">
      {children}
    </div>
  );
}
