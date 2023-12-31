const pipeline_handler = (res, data, user) => {
  try {
    const userInterests = user.interests;
    const pipeline = []
    if (Object.keys(data).length === 0) {
      return res.status(400).json({
        message: "You must provide language."
      })
    }  else {
      pipeline.push(
        {
          $match: {
            $expr: {
              $ne: ["$_id", user._id]
            }
          }
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
                        $addFields: {
                          commonLanguages: {
                            $setIntersection: [
                              "$languagesLearning.language", data.language
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
                        },
                      },
                      {
                        $limit: 5,
                      },
      
      )
    }
    
    return pipeline
  } catch (error) {
    console.error(error)
  }
}

module.exports = pipeline_handler