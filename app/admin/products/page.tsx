'use client';

import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  isActive: boolean;
  salesCount: number;
  createdAt: string;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: '기본 교정 프로그램',
    slug: 'basic',
    price: 490000,
    description: '반려견의 기본적인 행동 교정을 위한 입문 프로그램',
    features: ['기본 예절 교육', '산책 매너 훈련', '기초 복종 훈련', '4주 프로그램'],
    isActive: true,
    salesCount: 45,
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    name: '집중 교정 프로그램',
    slug: 'intensive',
    price: 890000,
    originalPrice: 990000,
    description: '문제 행동을 집중적으로 교정하는 심화 프로그램',
    features: ['문제행동 분석', '맞춤형 교정 플랜', '1:1 집중 훈련', '8주 프로그램', '무제한 상담'],
    isActive: true,
    salesCount: 78,
    createdAt: '2024-01-01',
  },
  {
    id: '3',
    name: '프리미엄 홈 케어',
    slug: 'premium',
    price: 1490000,
    description: '전문 훈련사가 직접 방문하여 교육하는 VIP 프로그램',
    features: ['가정 방문 교육', '환경 맞춤 훈련', '가족 교육 포함', '12주 프로그램', '평생 A/S'],
    isActive: true,
    salesCount: 23,
    createdAt: '2024-01-01',
  },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    price: '',
    originalPrice: '',
    description: '',
    features: '',
  });

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(amount);
  };

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        slug: product.slug,
        price: product.price.toString(),
        originalPrice: product.originalPrice?.toString() || '',
        description: product.description,
        features: product.features.join('\n'),
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        slug: '',
        price: '',
        originalPrice: '',
        description: '',
        features: '',
      });
    }
    setShowModal(true);
  };

  const handleSaveProduct = () => {
    const newProduct: Product = {
      id: editingProduct?.id || Date.now().toString(),
      name: formData.name,
      slug: formData.slug,
      price: parseInt(formData.price),
      originalPrice: formData.originalPrice ? parseInt(formData.originalPrice) : undefined,
      description: formData.description,
      features: formData.features.split('\n').filter((f) => f.trim()),
      isActive: editingProduct?.isActive ?? true,
      salesCount: editingProduct?.salesCount ?? 0,
      createdAt: editingProduct?.createdAt ?? new Date().toISOString().split('T')[0],
    };

    if (editingProduct) {
      setProducts(products.map((p) => (p.id === editingProduct.id ? newProduct : p)));
    } else {
      setProducts([...products, newProduct]);
    }

    setShowModal(false);
  };

  const handleToggleActive = (productId: string) => {
    setProducts(
      products.map((p) => (p.id === productId ? { ...p, isActive: !p.isActive } : p))
    );
  };

  const handleDeleteProduct = (productId: string) => {
    if (confirm('정말로 이 상품을 삭제하시겠습니까?')) {
      setProducts(products.filter((p) => p.id !== productId));
    }
  };

  return (
    <div className="space-y-6 pt-12 lg:pt-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">상품 관리</h1>
          <p className="text-gray-400 mt-1">총 {products.length}개의 상품</p>
        </div>
        <Button
          onClick={() => handleOpenModal()}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          <Plus className="h-5 w-5 mr-2" />
          상품 추가
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
        <input
          type="text"
          placeholder="상품명 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
        />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className={`bg-gray-800/50 border rounded-2xl p-6 ${
              product.isActive ? 'border-gray-700' : 'border-red-500/30 opacity-60'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{product.name}</h3>
                <p className="text-gray-500 text-sm">/{product.slug}</p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  product.isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}
              >
                {product.isActive ? '판매중' : '비활성'}
              </span>
            </div>

            <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>

            <div className="mb-4">
              {product.originalPrice && (
                <p className="text-gray-500 line-through text-sm">
                  {formatCurrency(product.originalPrice)}
                </p>
              )}
              <p className="text-2xl font-bold text-white">{formatCurrency(product.price)}</p>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
              <span>판매: {product.salesCount}건</span>
              <span>등록: {product.createdAt}</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleOpenModal(product)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-xl text-white transition-colors"
              >
                <Edit className="h-4 w-4" />
                수정
              </button>
              <button
                onClick={() => handleToggleActive(product.id)}
                className="p-2 bg-gray-700 hover:bg-gray-600 rounded-xl transition-colors"
                title={product.isActive ? '비활성화' : '활성화'}
              >
                {product.isActive ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-green-400" />
                )}
              </button>
              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="p-2 bg-gray-700 hover:bg-red-600 rounded-xl transition-colors"
                title="삭제"
              >
                <Trash2 className="h-4 w-4 text-red-400" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-white mb-6">
              {editingProduct ? '상품 수정' : '상품 추가'}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-1">상품명</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500"
                  placeholder="상품명을 입력하세요"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-1">슬러그 (URL)</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500"
                  placeholder="basic, intensive, premium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-1">판매가</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500"
                    placeholder="490000"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">정가 (선택)</label>
                  <input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500"
                    placeholder="할인 전 가격"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-1">설명</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500 min-h-[80px]"
                  placeholder="상품 설명을 입력하세요"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-1">특징 (줄바꿈으로 구분)</label>
                <textarea
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500 min-h-[120px]"
                  placeholder="기본 예절 교육&#10;산책 매너 훈련&#10;기초 복종 훈련"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowModal(false)}
                className="flex-1 border-gray-600 text-gray-300"
              >
                취소
              </Button>
              <Button
                onClick={handleSaveProduct}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
              >
                {editingProduct ? '수정' : '추가'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
