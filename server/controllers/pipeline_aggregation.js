

/*
    Match beginner with everyone
    Match Intermediate with Intermediate and Fluent
    Match Fluent with everyone
*/


const pipeline_handler = (res, data, user) => {
  try {
    const userInterests = user.interests;
    let pipeline = []
    if (Object.keys(data).length === 0) {
      return res.status(400).json({
        message: "You must provide language."
      })
    }  else {
      if (user.age >= 18) {
        user.languagesLearning.forEach((language) => {
          if (language.proficiency === "Beginner") {
            pipeline.push(  
                {
                  $addFields: {
                    commonInterests: {
                      $cond: {
                        if: { $isArray: "$interests" },
                        then: {
                          $setIntersection: [
                            "$interests",
                            userInterests
                          ],
                        },
                        else: "NA",
                      },
                    },
                  },
                },

                {
                  $addFields: {
                    commonLanguages: {
                      $setIntersection: [
                        "$languagesLearning.language", [data.language]
                      ]
                    }
                  }
                },
                
                {
                  $match: {
                    $expr: {
                      $and: [
                        { $gte: [ { $size: { $ifNull: ["$commonInterests", []] } }, 1 ] },
        { $gte: [ { $size: { $ifNull: ["$commonLanguages", []] } }, 1 ] }
                      ]
                    },
                    "languagesLearning.proficiency": {
                      $in: ["Beginner", "Intermediate", "Fluent"],
                    },
                    age: { $gte: 18 },
                  },
                },
                {
                  $limit: 10,
                },
              )
            } else if (language.proficiency === "Intermediate") {
            pipeline.push(
              
             
              {
                $addFields: {
                  commonInterests: {
                    $cond: {
                      if: { $isArray: "$interests" },
                      then: {
                        $setIntersection: [
                          "$interests",
                          userInterests
                        ],
                      },
                      else: "NA",
                    },
                  },
                },
              },

              {
                $addFields: {
                  commonLanguages: {
                    $setIntersection: [
                      "$languagesLearning.language", [data.language]                    ]
                  }
                }
              },

              {
                $match: {
                  $expr: {
                    $and: [
                      { $gte: [ { $size: { $ifNull: ["$commonInterests", []] } }, 1 ] },
        { $gte: [ { $size: { $ifNull: ["$commonLanguages", []] } }, 1 ] }
                    ]
                  },            
                  "languagesLearning.proficiency": {
                    $in: ["Intermediate"],
                  },
                  age: { $gte: 18 },
                },
              },
              {
                $limit: 10,
              })

            } else if (language.proficiency === "Fluent") {
              pipeline.push(
                
              {
                $addFields: {
                  commonInterests: {
                    $cond: {
                      if: { $isArray: "$interests" },
                      then: {
                        $setIntersection: [
                          "$interests",
                          userInterests
                        ],
                      },
                      else: "NA",
                    },
                  },
                },
              },

              {
                $addFields: {
                  commonLanguages: {
                    $setIntersection: [
                      "$languagesLearning.language", [data.language]                    ]
                  }
                }
              },

              {
                $match: {
                  $expr: {
                    $and: [
                      { $gte: [ { $size: { $ifNull: ["$commonInterests", []] } }, 1 ] },
        { $gte: [ { $size: { $ifNull: ["$commonLanguages", []] } }, 1 ] }
                    ]
                  },
                  "languagesLearning.proficiency": {
                    $in: ["Beginner", "Intermediate", "Fluent"],
                  },
                  age: { $gte: 18 },
                },
              },
              {
                $limit: 10,
              })

        }
        })
  }  else {
  // Match with users who are under 18
  // Perform matching logic for users under 18
  user.languagesLearning.forEach((language) => {
    if (language.proficiency === "Beginner") {
      pipeline.push(
        
          {
            $addFields: {
              commonInterests: {
                $cond: {
                  if: { $isArray: "$interests" },
                  then: {
                    $setIntersection: [
                      "$interests",
                      userInterests
                    ],
                  },
                  else: "NA",
                },
              },
            },
          },

          {
            $addFields: {
              commonLanguages: {
                $setIntersection: [
                  "$languagesLearning.language", [data.language]
                ]
              }
            }
          },

          {
            $match: {
              $expr: {
                $and: [
                  { $gte: [ { $size: { $ifNull: ["$commonInterests", []] } }, 1 ] },
        { $gte: [ { $size: { $ifNull: ["$commonLanguages", []] } }, 1 ] }
                ]
              },
              "languagesLearning.proficiency": {
                $in: ["Beginner", "Intermediate", "Fluent"],
              },
              age: { $lte: 18 },
            },
          },
          {
            $limit: 10,
          },
        )

      } else if (language.proficiency === "Intermediate") {
      pipeline.push(
    
       
        {
          $addFields: {
            commonInterests: {
              $cond: {
                if: { $isArray: "$interests" },
                then: {
                  $setIntersection: [
                    "$interests",
                    userInterests
                  ],
                },
                else: "NA",
              },
            },
          },
        },

        {
          $addFields: {
            commonLanguages: {
              $setIntersection: [
                "$languagesLearning.language", [data.language]
              ]
            }
          }
        },

        {
          $match: {
            $expr: {
              $and: [
                { $gte: [ { $size: { $ifNull: ["$commonInterests", []] } }, 1 ] },
        { $gte: [ { $size: { $ifNull: ["$commonLanguages", []] } }, 1 ] }
              ]
            },             
            "languagesLearning.proficiency": {
              $in: ["Intermediate"],
            },
            age: { $lte: 18 },
          },
        },
        {
          $limit: 10,
        })

      } else if (language.proficiency === "Fluent") {
        pipeline.push(
        
        {
          $addFields: {
            commonInterests: {
              $cond: {
                if: { $isArray: "$interests" },
                then: {
                  $setIntersection: [
                    "$interests",
                    userInterests
                  ],
                },
                else: "NA",
              },
            },
          },
        },

        {
          $addFields: {
            commonLanguages: {
              $setIntersection: [
                "$languagesLearning.language", [data.language]
              ]
            }
          }
        },

        {
          $match: {
            $expr: {
              $and: [
                { $gte: [ { $size: { $ifNull: ["$commonInterests", []] } }, 1 ] },
                { $gte: [ { $size: { $ifNull: ["$commonLanguages", []] } }, 1 ] }
              ]
            },
            "languagesLearning.proficiency": {
              $in: ["Beginner", "Intermediate", "Fluent"],
            },
            age: { $lte: 18 },
          },
        },
        {
          $limit: 10,
        })

  }
  })
  }
    }

    return pipeline
  } catch (error) {
    console.error(error)
  }
}

module.exports = pipeline_handler