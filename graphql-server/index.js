import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import casual from "casual";

const roles = [
  "Software Developer",
  "Product Manager",
  "Data Analyst",
  "SEO Specialist",
  "Frontend Developer",
  "Backend Developer",
  "Quality Assurance Engineer",
  // Diğer meslekler buraya eklenebilir
];

const mocks = {
  Query: () => ({
    employees: () =>
      new Array(12).fill(undefined).map(() => ({
        id: casual.uuid,
        name: casual.name,
        age: casual.integer(18, 40),
        email: casual.email,
        role: casual.random_element(roles),
        vote: casual.integer(1, 20),
      })),
  }),
};

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type Employee {
    id: ID!
    name: String!
    age: Int!
    email: String!
    role: String!
    vote: Int!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    employees: [Employee]!
    employee(id: ID!): Employee!
  }

  type Mutation {
    voteEmployee(id: ID!): Employee
  }
`;

const allEmployees = mocks.Query().employees()

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    employees: () => allEmployees,
    employee: (_, { id }) => {
      const employee = allEmployees.find((user) => user.id === id);
      
      if (!employee) {
        throw new Error(`Employee with ID ${id} not found`);
      }
      return employee;
    },
  },
  Mutation: {
    voteEmployee: (_, { id }) => {
      const index = allEmployees.findIndex((employee) => employee.id === id);
      if (index === -1) {
        throw new Error(`Employee with ID ${id} not found`);
      }
      allEmployees[index].vote++;
      return allEmployees[index];
    }
  }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
