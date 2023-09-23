

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
      return res.json({
        message: "You must provide language."
      })
    }  else {
      if (user.age >= 18) {
        user.languagesLearning.forEach((language, i) => {
          if (language.proficiency === "Beginner" && language.language === data.language) {
            pipeline.push(
                {
                  $addFields: {
                    commonLanguages: {
                      $setIntersection: ["$languagesLearning.language", data.language]
                      // commonLanguages is equal to ["Russian"]
                    },
                  },
                },
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
                  $match: {
                    $expr: {
                      $gte: [ { $size: "$commonInterests" }, 1 ]
                    },
                    commonLanguages: { $gte: 1 },
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

            } else if (language.proficiency === "Intermediate"  && language.language === data.language) {
            pipeline.push(
              {
                $addFields: {
                  commonLanguages: {
                    $setIntersection: ["$languagesLearning.language", data.language]
                  },
                },
              },
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
                $match: {
                  $expr: {
                    $gte: [ { $size: "$commonInterests" }, 1 ]
                  },
                  commonLanguages: { $gte: 1 },
                  "languagesLearning.proficiency": {
                    $in: ["Intermediate"],
                  },
                  age: { $gte: 18 },
                },
              },
              {
                $limit: 10,
              })

            } else if (language.proficiency === "Fluent"  && language.language === data.language) {
              console.log("fluent")
              pipeline.push(
              {
                $addFields: {
                  commonLanguages: {
                    $setIntersection: ["$languagesLearning.language", data.language]
                  },
                },
              },
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
                $match: {
                  $expr: {
                    $gte: [ { $size: "$commonInterests" }, 1 ]
                  },
                  commonLanguages: { $gte: 1 },
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
  }
    }

    return pipeline
  } catch (error) {
    console.error(error)
  }
}

module.exports = pipeline_handler