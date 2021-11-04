package main

import (
	"github.com/bankvery007/sa-64-example/controller"
	"github.com/bankvery007/sa-64-example/entity"
	"github.com/bankvery007/sa-64-example/middlewares"
	"github.com/gin-gonic/gin"
)

func main() {

	entity.SetupDatabase()
	r := gin.Default()
	r.Use(CORSMiddleware())
	api := r.Group("")
	{
		protected := api.Use(middlewares.Authorizes())
		{

			// Activity Routes
			protected.GET("/activities/clubid/:ClubID", controller.ClubwithActivity) // ระบุ parameter ClubID
			protected.GET("/activities", controller.ListActivities)
			protected.GET("/activity/:id", controller.GetActivity)
			protected.POST("/activities", controller.CreateActivity)
			protected.PATCH("/activities", controller.UpdateActivity)
			protected.DELETE("/activities/:id", controller.DeleteActivity)

			// Club Routes
			protected.GET("/clubname/clubcommittee/:id", controller.GetClubwithClubCommittee)
			protected.GET("/clubs", controller.ListClubs)
			protected.GET("/club/:id", controller.GetClub)
			protected.POST("/clubs", controller.CreateClub)
			protected.PATCH("/clubs", controller.UpdateClub)
			protected.DELETE("/clubs/:id", controller.DeleteClub)

			// BudgetProposal Routes
			protected.GET("/budget_proposals", controller.ListBudgetProposals)
			protected.GET("/budgetproposal/:id", controller.GetBudgetProposal)
			protected.POST("/budget_proposals", controller.CreateBudgetProposal)
			protected.PATCH("/budget_proposals", controller.UpdateBudgetProposal)
			protected.DELETE("/budgetproposals/:id", controller.DeleteBudgetProposal)

			// BudgetCategory Routes
			protected.GET("/budgetcategories", controller.ListBudgetCategories)
			protected.GET("/budgetcategory/:id", controller.GetBudgetCategory)
			protected.POST("/budgetcategories", controller.CreateBudgetCategory)
			protected.PATCH("/budgetcategories", controller.UpdateBudgetCategory)
			protected.DELETE("/budgetcategories/:id", controller.DeleteBudgetCategory)

			// BudgetType Routes
			protected.GET("/budgettypes", controller.ListBudgetTypes)
			protected.GET("/budgettype/:id", controller.GetBudgetType)
			protected.POST("/budgettypes", controller.CreateBudgetType)
			protected.PATCH("/budgettypes", controller.UpdateBudgetType)
			protected.DELETE("/budgettypes/:id", controller.DeleteBudgetType)

			// clubcommittee Routes
			protected.GET("/clubcommittees", controller.ListClubCommittees)
			protected.GET("/clubcommittee/:id", controller.GetClubCommittee)
			protected.POST("/clubcommittees", controller.CreateClubCommittee)
			protected.PATCH("/clubcommittees", controller.UpdateClubCommittee)
			protected.DELETE("/clubcommittees/:id", controller.DeleteClubCommittee)

		}
	}

	// Authentication Routes
	r.POST("/login", controller.LoginByClubCommittee)

	// Run the server
	r.Run()
}
func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
