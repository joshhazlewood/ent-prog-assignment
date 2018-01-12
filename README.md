# ent-prog-assignment

Both projects run on Java version 8 and tomcat v8.5

In a workspace of your choice (I have tried on fresh workspaces only) import ONLY the projects FilmSoap and com.democo.jersey.film, not the original folder root + nested projects.

Ensure correct java versions and tomcat is installed and are being used.

For each project, do the following:
  - Right click project name -> Properties -> Project facets
  - Ensure java 1.8 (1.7 works too, but I'm only confident with 1.8) is selected.
  - 'Runtimes' tab -> select Apache Tomcat v8.5
  - If not present, select New and follow the wizard to add new server.
  - Proceed to next set of instructions.

Running the project FilmSoap:
  - In the eclipse project browser, right click FilmSoap
  - Run As -> run on server
  - Select tomcat server and press next
  - Ensure correct projects are in configured
  - Finish
  - Go to http://localhost:8080/FilmSoap/
  - Use application

Running the project com.democo.jersey.film:
  - In the eclipse project browser, right click com.democo.jersey.film
  - Run As -> run on server
  - Select tomcat server and press next
  - Ensure correct projects are in configured
  - Finish
  - Go to http://localhost:8080/com.democo.jersey.film/ for the index page
  - See WSDL or my evidence file for instructions on using the program.

Common issues while attempting to run (both projects):

HttpServlet class missing error --> most likely an incorrect tomcat being used, reselect 8.5 and clean project.

MySQL errors thrown --> classpath isn't pointing to correct JAR. I've tried on two of my own machines and this seems to not be a common problem.
                        Failing that, add the JARs provided in the root of the extracted folder.

Tomcat won't start due error: "Multiple contexts have a path of <project name>" --> Servers/Tomcat 8.5/server.xml has dulplicate entries for the quoted project, remove one.