import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Container } from '../components/layout/Container'
import { ProductCard } from '../components/product/ProductCard'
import { EmptyState } from '../components/ui/EmptyState'
import { ProductSkeleton } from '../components/ui/LoadingSpinner'
import { brands, categories, watches } from '../data/watches'

const priceRanges = [
  { id: 'all', label: 'Any price', min: 0, max: Infinity },
  { id: 'under6', label: 'Under $6,000', min: 0, max: 5999 },
  { id: '6to12', label: '$6,000 – $12,000', min: 6000, max: 12000 },
  { id: 'over12', label: 'Above $12,000', min: 12001, max: Infinity },
]

export function Collection() {
  const [params, setParams] = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState(params.get('q') || '')
  const [category, setCategory] = useState(params.get('category') || 'all')
  const [brand, setBrand] = useState(params.get('brand') || 'all')
  const [price, setPrice] = useState(params.get('price') || 'all')
  const [sort, setSort] = useState(params.get('sort') || 'featured')
  const [filtersOpen, setFiltersOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    document.body.style.overflow = filtersOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [filtersOpen])

  useEffect(() => {
    setCategory(params.get('category') || 'all')
    setBrand(params.get('brand') || 'all')
    setSort(params.get('sort') || 'featured')
    setPrice(params.get('price') || 'all')
    setSearch(params.get('q') || '')
  }, [params])

  const filtered = useMemo(() => {
    const range = priceRanges.find((item) => item.id === price) || priceRanges[0]
    const query = search.trim().toLowerCase()
    const result = watches.filter((watch) => {
      const haystack = `${watch.name} ${watch.brand} ${watch.category}`.toLowerCase()
      const matchesSearch = !query || haystack.includes(query)
      const matchesCategory = category === 'all' || watch.category === category
      const matchesBrand = brand === 'all' || watch.brand === brand
      const matchesPrice = watch.price >= range.min && watch.price <= range.max
      return matchesSearch && matchesCategory && matchesBrand && matchesPrice
    })

    const sorted = [...result]
    if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price)
    if (sort === 'new') sorted.sort((a, b) => Number(b.isNew) - Number(a.isNew))
    if (sort === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name))
    return sorted
  }, [search, category, brand, price, sort])

  const patchParams = (updates) => {
    const next = new URLSearchParams(window.location.search)
    Object.entries(updates).forEach(([key, value]) => {
      if (!value || value === 'all' || value === 'featured') next.delete(key)
      else next.set(key, value)
    })
    setParams(next)
  }

  const updateCategory = (value) => patchParams({ category: value })
  const updateBrand = (value) => patchParams({ brand: value })
  const updatePrice = (value) => patchParams({ price: value })
  const updateSort = (value) => patchParams({ sort: value })

  const resetFilters = () => {
    setSearch('')
    setParams({})
    setFiltersOpen(false)
  }

  const activeFilters = [
    category !== 'all' && { key: 'category', label: category },
    brand !== 'all' && { key: 'brand', label: brand },
    price !== 'all' && { key: 'price', label: priceRanges.find((item) => item.id === price)?.label },
    search.trim() && { key: 'q', label: `"${search.trim()}"` },
  ].filter(Boolean)

  const FilterGroup = () => (
    <div className="space-y-8">
      <div>
        <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-gold">Category</p>
        <div className="flex flex-col gap-2">
          {['all', ...categories].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => updateCategory(item)}
              className={`text-left text-sm capitalize transition-colors ${
                category === item ? 'text-gold' : 'text-muted hover:text-cream'
              }`}
            >
              {item === 'all' ? 'All categories' : item}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-gold">Brand</p>
        <div className="flex flex-col gap-2">
          {['all', ...brands].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => updateBrand(item)}
              className={`text-left text-sm transition-colors ${
                brand === item ? 'text-gold' : 'text-muted hover:text-cream'
              }`}
            >
              {item === 'all' ? 'All maisons' : item}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-gold">Price</p>
        <div className="flex flex-col gap-2">
          {priceRanges.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => updatePrice(item.id)}
              className={`text-left text-sm transition-colors ${
                price === item.id ? 'text-gold' : 'text-muted hover:text-cream'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      {activeFilters.length > 0 && (
        <button
          type="button"
          onClick={resetFilters}
          className="text-[11px] uppercase tracking-[0.24em] text-gold hover:text-gold-soft"
        >
          Clear all filters
        </button>
      )}
    </div>
  )

  return (
    <Container className="py-16 md:py-20">
      <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-[10px] uppercase tracking-[0.28em] text-gold sm:text-[11px] sm:tracking-[0.4em]">The collection</p>
          <h1 className="mt-3 font-serif text-4xl italic text-cream sm:text-5xl md:text-6xl">Salon pieces</h1>
          <p className="mt-4 text-sm leading-7 text-muted">
            Filter by category, maison, and price. Search a name, then sort the salon as you wish.
          </p>
        </div>
        <p className="text-[11px] uppercase tracking-[0.24em] text-muted">
          {loading ? '…' : `${filtered.length} piece${filtered.length === 1 ? '' : 's'}`}
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-stretch">
        <input
          type="search"
          value={search}
          onChange={(event) => {
            const value = event.target.value
            setSearch(value)
            patchParams({ q: value.trim() })
          }}
          placeholder="Search name, brand or category"
          className="min-w-0 flex-1 border border-line bg-panel px-4 py-3 text-sm text-cream outline-none placeholder:text-muted focus:border-gold"
        />
        <select
          value={sort}
          onChange={(event) => updateSort(event.target.value)}
          className="border border-line bg-panel px-4 py-3 text-sm text-cream outline-none focus:border-gold md:w-56"
        >
          <option value="featured">Sort: Featured</option>
          <option value="new">Newest</option>
          <option value="price-asc">Price: Low to high</option>
          <option value="price-desc">Price: High to low</option>
          <option value="name">Name A–Z</option>
        </select>
        <button
          type="button"
          onClick={() => setFiltersOpen(true)}
          className="border border-gold/50 px-4 py-3 text-[11px] uppercase tracking-[0.24em] text-gold lg:hidden"
        >
          Filters{activeFilters.length ? ` (${activeFilters.length})` : ''}
        </button>
      </div>

      {activeFilters.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {activeFilters.map((filter) => (
            <button
              key={filter.key}
              type="button"
              onClick={() => {
                if (filter.key === 'q') {
                  setSearch('')
                  patchParams({ q: '' })
                  return
                }
                patchParams({ [filter.key]: 'all' })
              }}
              className="border border-gold/40 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-gold hover:bg-gold hover:text-ink"
            >
              {filter.label} ×
            </button>
          ))}
        </div>
      )}

      <div className="grid items-start gap-10 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <FilterGroup />
        </aside>
        <div>
          {loading ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState
              title="No pieces match"
              text="Adjust the filters or search another maison."
              actionLabel="Clear filters"
              onAction={resetFilters}
            />
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((watch) => (
                <ProductCard key={watch.id} watch={watch} />
              ))}
            </div>
          )}
        </div>
      </div>

      {filtersOpen && (
        <div
          className="fixed inset-0 z-50 bg-ink/80 backdrop-blur-sm lg:hidden"
          onClick={() => setFiltersOpen(false)}
        >
          <div
            className="absolute inset-y-0 left-0 flex w-[min(86vw,360px)] flex-col border-r border-line bg-ink"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Filters</p>
              <button type="button" onClick={() => setFiltersOpen(false)} className="text-cream">
                Close
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
              <FilterGroup />
            </div>
            <div className="border-t border-line p-6">
              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                className="w-full bg-gold py-3 text-[11px] uppercase tracking-[0.24em] text-ink"
              >
                Show {filtered.length} pieces
              </button>
            </div>
          </div>
        </div>
      )}
    </Container>
  )
}
