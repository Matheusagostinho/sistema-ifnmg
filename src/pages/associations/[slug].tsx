import { GetStaticPaths } from 'next'

export default function Associations() {
  return <div>heloo</div>
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   return {
//     // Only `/posts/1` and `/posts/2` are generated at build time
//     paths: [{ params: { slug: '1' } }, { params: { slug: '2' } }],
//     // Enable statically generating additional pages
//     // For example: `/posts/3`
//     fallback: true
//   }
// }
