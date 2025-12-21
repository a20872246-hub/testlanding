export default function Footer() {
  const currentYear = new Date().getFullYear();

  const companyInfo = {
    name: '회사명',
    address: '서울특별시 강남구 테헤란로 123, 4층',
    phone: '02-1234-5678',
    email: 'contact@company.com',
    businessNumber: '123-45-67890',
  };

  return (
    <footer className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* 회사정보 영역 */}
        <div className="text-left">
          <h3 className="font-bold text-gray-900 mb-4">{companyInfo.name}</h3>
          <div className="space-y-2 text-gray-600">
            <p>{companyInfo.address}</p>
            <p>전화: {companyInfo.phone}</p>
            <p>이메일: {companyInfo.email}</p>
            <p>사업자등록번호: {companyInfo.businessNumber}</p>
          </div>
        </div>

        {/* 저작권 영역 */}
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-600">
            Copyright {currentYear} {companyInfo.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
