// declare module '*.png'
// declare module '*.jpg'
// declare module '*.jpeg'
// declare module '*.svg'
// declare module '*.gif'

declare module '*.svg' {
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
  export default ReactComponent
}

// declare module '*.svg' {
//   const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
//   const content: string
//   export { ReactComponent }
//   export default content
// }
