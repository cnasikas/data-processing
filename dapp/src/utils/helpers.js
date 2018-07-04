import moment from 'moment'

const isString = (str) => {
  return Object.prototype.toString.call(str) === '[object String]'
}

const slugify = (string) => {
  return string
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

const formatDate = (date) => moment(date).format('DD/MM/YYYY')

export {
  isString,
  slugify,
  formatDate
}
