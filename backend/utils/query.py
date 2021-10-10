SEARCH_QUERY = """
{
    search(input: { type: DATASET, query: "%(query)s", start: %(start)s, count: %(count)s}) {
    start
    count
    total
    searchResults {
      entity {
        urn
        type
        ... on Dataset {
          name
          institutionalMemory {
              elements {
                url
                label
                description
                author {
                  username
                }
              }
            }
          ownership {
            lastModified {
              actor
              time
            }
            owners {
              type
              owner {
                __typename
                ... on CorpUser {
                  username
                  urn
                  type
                  properties {
                    email
                    fullName
                    active
                    displayName
                    countryCode
                  }
                  editableProperties {
                    aboutMe
                    teams
                    skills
                    pictureLink
                  }
                }
                ... on CorpGroup {
                  name
                  urn
                  type
                  properties {
                    email
                    description
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

"""


DATASET_INFO = """
{
  dataset(urn: "%(name)s") {
    platform{
      urn
      name
    }
    schemaMetadata(version: 0) {
      name
      primaryKeys
      foreignKeys {
        name
        foreignFields {
          fieldPath
          parent
        }
      }
      fields {
        type
        fieldPath
        jsonPath
        description
        nullable
        tags {
          tags {
            tag {
              name
            }
          }
        }
      }
    }
    institutionalMemory {
      elements {
        url
        label
        description
        author {
          username
        }
      }
    }
    ownership {
      lastModified {
        actor
        time
      }
      owners {
        type
        owner {
          __typename
          ... on CorpUser {
            username
            urn
            type
            properties {
              email
              fullName
              active
              displayName
              countryCode
            }
            editableProperties {
              aboutMe
              teams
              skills
              pictureLink
            }
            tags {
              tags {
                tag {
                  type
                }
              }
            }
          }
          ... on CorpGroup {
            name
            urn
            type
            properties {
              email
              description
            }
          }
        }
        source {
          url
        }
      }
    }
  }
}
"""

FIELDS_INFO = """{
  dataset(urn: "%(name)s") {
    schemaMetadata(version: 0) {
      fields {
        type
        fieldPath
        jsonPath
        description
        nullable
      }
    }
  }
}
"""
