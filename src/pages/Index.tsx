
import React from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import CategorySection from '@/components/CategorySection';
import FeaturedProducts from '@/components/FeaturedProducts';
import Newsletter from '@/components/Newsletter';
import FeaturesBanner from '@/components/FeaturesBanner';
import { featuredProducts, newArrivals, categories } from '@/data/mockData';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <CategorySection categories={categories} className="mt-8" />
      <FeaturedProducts 
        title="Productos Destacados" 
        subtitle="Selección de nuestros modelos más populares"
        products={featuredProducts} 
        viewAllLink="/catalogo" 
      />
      <div className="bg-terracota/5 py-16">
        <FeaturedProducts 
          title="Recién Llegados" 
          subtitle="Las últimas incorporaciones a nuestra colección"
          products={newArrivals} 
          viewAllLink="/nuevos" 
          className="bg-transparent"
        />
      </div>
      <FeaturesBanner />
      <Newsletter />
    </Layout>
  );
};

export default Index;
