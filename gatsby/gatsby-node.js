const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve('src/components/pages/PostPage/index.js')

  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.')
    return
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: blogPostTemplate,
      context: {
        slug: node.fields.slug,
      },
    })
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode })
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })
  }
}

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions
  const typeDefs = [
    // MarkdownReamrk node에 frontmatter 필드 추가.
    schema.buildObjectType({
      name: 'MarkdownRemark',
      fields: {
        frontmatter: 'Frontmatter',
      },
      interfaces: ['Node'],
    }),
    // frontamtter spec.
    schema.buildObjectType({
      name: 'Frontmatter',
      fields: {
        tags: {
          type: '[String!]!',
          resolve: (src) => {
            const tags = (src.tags || '')
              .split(',')
              .filter(Boolean)
              .map((s) => s.trim())
            return [...new Set(tags)]
          },
        },
        date: {
          type: 'Date',
        },
      },
      interfaces: ['Node'],
    }),
  ]
  createTypes(typeDefs)
}
