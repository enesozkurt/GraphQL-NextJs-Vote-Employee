import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

export async function getEmployees() {
  const { data } = await client.query({
    query: gql`
      query {
        employees {
          id
          name
          email
          role
          age
          vote
        }
      }
    `,
  });

  return data.employees;
}

export async function getEmployee(id) {
  const { data } = await client.query({
    query: gql`
      query GetEmployee($id: ID!) {
        employee(id: $id) {
          id
          name
          email
          role
          age
          vote
        }
      }
    `,
    variables: { id },
  });

  return data.employee;
}

export async function voteForEmployee(id) {
  const { data } = await client.mutate({
    mutation: gql`
      mutation VoteForEmployee($id: ID!) {
        voteEmployee(id: $id) {
          id
          age
          email
          name
          role
          vote
        }
      }
    `,
    variables: { id },
  });

  return data.voteEmployee;
}
