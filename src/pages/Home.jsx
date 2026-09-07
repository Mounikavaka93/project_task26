import { BestSellers } from '../components/home/BestSellers'
import { BrandMarquee } from '../components/home/BrandMarquee'
import { FeaturedCollections } from '../components/home/FeaturedCollections'
import { Hero } from '../components/home/Hero'
import { NewArrivals } from '../components/home/NewArrivals'
import { Newsletter } from '../components/home/Newsletter'
import { PromoBanner } from '../components/home/PromoBanner'
import { Testimonials } from '../components/home/Testimonials'

export function Home() {
  return (
    <>
      <Hero />
      <FeaturedCollections />
      <NewArrivals />
      <BestSellers />
      <BrandMarquee />
      <PromoBanner />
      <Testimonials />
      <Newsletter />
    </>
  )
}
