<%@ page import="java.util.List" %>
<%@ page import="javax.xml.bind.JAXBContext" %>
<%@ page import="javax.xml.bind.JAXBException" %>
<%@ page import="javax.xml.bind.Marshaller" %>
<%@ page import="model.Film" %>
<%@ page import="model.FilmList" %>
<%@ page trimDirectiveWhitespaces="true" %>
<%
	FilmList cities = new FilmList((List<Film>) request.getAttribute("films"));
	try {
		JAXBContext jaxbContext = JAXBContext.newInstance(FilmList.class);
		Marshaller jaxbMarshaller = jaxbContext.createMarshaller();
		// output pretty printed
		jaxbMarshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
		jaxbMarshaller.marshal(cities, out); // out is the stream back to browser
	} catch (JAXBException e) {
		e.printStackTrace();
	}
%>