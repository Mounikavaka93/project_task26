import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

export function Reveal({
  children,
  className = '',
  delay = 0,
  y = 48,
  once = true,
  as: Tag = motion.div,
}) {
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </Tag>
  )
}

export function Stagger({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: 0.12, delayChildren: delay },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = '', y = 36 }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
      }}
    >
      {children}
    </motion.div>
  )
}

export function SplitHeading({ text, className = '', delay = 0 }) {
  const words = text.split(' ')

  return (
    <span className={className}>
      {words.map((word, wordIndex) => (
        <span key={`${word}-${wordIndex}`} className="inline-block overflow-hidden align-bottom whitespace-nowrap">
          {word.split('').map((char, index) => (
            <motion.span
              key={`${char}-${index}`}
              className="inline-block"
              initial={{ y: '110%', rotateX: 40, opacity: 0 }}
              whileInView={{ y: '0%', rotateX: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: delay + (wordIndex * 8 + index) * 0.035,
                ease,
              }}
            >
              {char}
            </motion.span>
          ))}
          {wordIndex < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </span>
  )
}
