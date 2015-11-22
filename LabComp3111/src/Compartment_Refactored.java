
public class Compartment_Refactored {
	
	private String compartmentName = null;
	private Integer compartmentID = null;
	private Integer studentYear = null;
	private Integer numberOfStudents = null;
	
	public Compartment(String compartmentName, Integer compartmentID, String description)
	{
		this.compartmentName = compartmentName;
		this.compartmentID = compartmentID;
		this.x = description;
	}
	
	public String getCompartmentName()
	{
		return this.compartmentName;
	}
	
	int available()
	{
		return (numberOfStudents < 100) ? 2:1;
	}
	
	//Pull down method
	//End

}
	
