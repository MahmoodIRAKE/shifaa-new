import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import ProductGallery from '../components/shop-details/ProductGallery';
import ProductInfo from '../components/shop-details/ProductInfo';
import ProductTabs from '../components/shop-details/ProductTabs';
import RelatedProducts from '../components/shop-details/RelatedProducts';
import BreadcrumbArea from '../components/common/BreadcrumbArea';
// import { addToCart } from '../store/cart/CartSlice';
import '../assets/css/style.css';
import '../assets/css/responsive.css';

const ShopDetails = () => {
  const { t, language } = useLanguage();
  const dispatch = useDispatch();
  const { productId } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  // Translation keys for breadcrumb
  const translations = {
    home: {
      en: "Home",
      he: "בית",
      ar: "الرئيسية"
    },
    shop: {
      en: "Shop",
      he: "متجر",
      ar: "المتجر"
    }
  };

  const getTranslation = (key) => {
    return translations[key]?.[language] || translations[key]?.en || key;
  };

  // Sample product data matching the new JSON structure
  const product = {
    _id: "67dc66be3c1404ad4cc71add",
    title: "Baraka for life",
    name: "Baraka for life",
    mainDescription: "Life for Baraka ﻫﻮ ﻣﻜﻤﻞ ﻏﺬاﺋﻲ ﻃﺒﻴﻌﻲ ﻣﺴﺘﺨﻠﺺ ﻣﻦ ﺣﺒﺔ اﻟﱪﻛﺔ (الحبه السوداء) ، ﻣﺼﻤﻢ ﻟﺪﻋﻢ اﻟﻤﻨﺎﻋﺔ، اﻟﻄﺎﻗﺔ، وﺻﺤﺔ اﻟﺠﻬﺎز اﻟﻬﻀﻤﻲ ﺑﻄﺮﻳﻘﺔ ﻃﺒﻴﻌﻴﺔ وآﻣﻨﺔ. ﺗﻢ ﺗﻄﻮﻳﺮ ﻫﺬا اﻟﻤﻨﺘﺞ ﺑﻌﻨﺎﻳﺔ ﻟﻴﻤﻨﺢ اﻟﺠﺴﻢ اﻟﻘﻮة واﻻﺗﺰان ﻋﱪ ﺗﻮﻓﲑ ﻣﻀﺎدات أﻛﺴﺪة ﻃﺒﻴﻌﻴﺔ، أﺣﻤﺎض دﻫﻨﻴﺔ أﺳﺎﺳﻴﺔ، وﻋﻨﺎﴏ ﻏﺬاﺋﻴﺔ ﺗﺪﻋﻢ اﻟﺼﺤﺔ اﻟﻌﺎﻣﺔ.",
    ingredientsIds: [
      {
        _id: "67dc65693c1404ad4cc71ac5",
        ingredientName: "حبة البركة ",
        ingredientDescription: "كنز من الطبيعة ،تعزز المناعة، تقلل الالتهابات، وتحمي من الأمراض",
        active: true
      },
      {
        _id: "67dc65823c1404ad4cc71ac9",
        ingredientName: "سبيرولينا ",
        ingredientDescription: "مصدر طبيعي للطاقة، غني بالفيتامينات والمعادن، يدعم صحة الدم ",
        active: true
      }
    ],
    extraDescription: "-  ﻳﻌﺰز اﻟﻤﻨﺎﻋﺔ اﻟﻄﺒﻴﻌﻴﺔ، ﻣﻤﺎ ﻳﺴﺎﻋﺪ ﻓﻲ اﻟﺤﻤﺎﻳﺔ ﻣﻦ اﻟﻔﲑوﺳﺎت واﻟﺒﻜﺘﲑﻳﺎ. -  ﻳﺪﻋﻢ ﺻﺤﺔ اﻟﻘﻠﺐ ﻋﱪ ﺗﻘﻠﻴﻞ ﻣﺴﺘﻮﻳﺎت اﻟﻜﻮﻟﻴﺴﱰول اﻟﻶر وﺗﺤﺴﲔ ﺗﺪﻓﻖ اﻟﺪم. -  يدعم اﻟﻬﻀﻢ وﻳﺴﺎﻋﺪ ﻓﻲ ﺗﻘﻠﻴﻞ ﻣﺸﺎﻛﻞ اﻟﺠﻬﺎز اﻟﻬﻀﻤﻲ ﻣﺜﻞ اﻻﻧﺘﻔﺎخ واﻟﺘﻬﺎﺑﺎت اﻷﻣﻌﺎء.",
    active: true,
    price: 275,
    isApproved: true,
    image: "https://firebasestorage.googleapis.com/v0/b/shifaa-1a2e4.firebasestorage.app/o/2.png?alt=media&token=93bec75a-1ead-44cc-a2b5-76aa5480abf7",
    image2: "https://firebasestorage.googleapis.com/v0/b/shifaa-1a2e4.firebasestorage.app/o/Baraka600.png?alt=media&token=03657fcd-6a30-4ec4-baaf-24ed70c96c25",
    howToUseInfo: "كبسولتين في اليوم مع كاسة ماء",
    discountForTwo: 10,
    // Additional fields for compatibility
    id: "67dc66be3c1404ad4cc71add",
    brand: 'Shifaa',
    originalPrice: 300,
    rating: 4.8,
    totalReviews: 5,
    stockStatus: 'in-stock',
    productId: 'BARAKA001',
    images: [
      "https://firebasestorage.googleapis.com/v0/b/shifaa-1a2e4.firebasestorage.app/o/Baraka600.png?alt=media&token=03657fcd-6a30-4ec4-baaf-24ed70c96c25",
      "https://firebasestorage.googleapis.com/v0/b/shifaa-1a2e4.firebasestorage.app/o/2.png?alt=media&token=93bec75a-1ead-44cc-a2b5-76aa5480abf7"
    ],
    details: {
      type: 'Natural Supplement',
      expiryDate: 'Dec 2025',
      company: 'Shifaa'
    },
    categories: ['Natural', 'Immunity', 'Energy', 'Digestive Health'],
    tags: ['Natural Supplement', 'Immunity Booster'],
    specifications: {
      type: 'Natural Supplement',
      ingredients: 'حبة البركة، سبيرولينا',
      dosage: 'كبسولتين في اليوم',
      expiryDate: 'Dec 2025',
      company: 'Shifaa'
    },
    reviews: [
      {
        id: 1,
        name: 'أحمد محمد',
        date: 'May 12, 2024',
        rating: 5,
        comment: 'منتج ممتاز! شعرت بتحسن كبير في الطاقة والمناعة بعد استخدامه لمدة أسبوعين.',
        image: '/src/assets/img/others/p_review_img01.jpg'
      },
      {
        id: 2,
        name: 'فاطمة علي',
        date: 'June 17, 2024',
        rating: 4,
        comment: 'منتج طبيعي وفعال. ساعدني في تحسين صحة الجهاز الهضمي.',
        image: '/src/assets/img/others/p_review_img02.jpg'
      },
      {
        id: 3,
        name: 'محمد حسن',
        date: 'May 28, 2024',
        rating: 5,
        comment: 'أفضل مكمل غذائي طبيعي استخدمته. أنصح به بشدة!',
        image: '/src/assets/img/others/p_review_img03.jpg'
      }
    ]
  };

  const handleAddToCart = () => {
    // dispatch(addToCart({
    //   id: product._id,
    //   name: product.name,
    //   price: product.price,
    //   image: product.image2,
    //   quantity: quantity
    // }));
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleImageSelect = (index) => {
    setSelectedImage(index);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="main-area fix" style={{ textAlign: 'center' }}>
      {/* Breadcrumb Area */}
      <BreadcrumbArea 
        title={product.name} 
        breadcrumbs={[
          { name: getTranslation('home'), link: '/' },
          { name: getTranslation('shop'), link: '/shop' },
          { name: product.name, link: `/product/${productId}` }
        ]}
      />

      {/* Shop Details Area */}
      <section className="inner-shop-details-area" style={{ textAlign: 'center' }}>
        <div className="container">
          <div className="row" style={{ justifyContent: 'center' }}>
            <div className="col-lg-6" style={{ display: 'flex', justifyContent: 'center' }}>
              <ProductGallery 
                images={product.images}
                selectedImage={selectedImage}
                onImageSelect={handleImageSelect}
              />
            </div>
            <div className="col-lg-6" style={{ display: 'flex', justifyContent: 'center' }}>
              <ProductInfo 
                product={product}
                quantity={quantity}
                onQuantityChange={handleQuantityChange}
                onAddToCart={handleAddToCart}
              />
            </div>
          </div>
          <div className="row" style={{ justifyContent: 'center' }}>
            <div className="col-12" style={{ display: 'flex', justifyContent: 'center' }}>
              <ProductTabs 
                product={product}
                activeTab={activeTab}
                onTabChange={handleTabChange}
              />
            </div>
          </div>
        </div>
      </section>

   
    </div>
  );
};

export default ShopDetails;
