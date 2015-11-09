import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.PersistenceContext;

@Stateless
public class UserDAO {
	@PersistenceContext(unitName = "AIOP_PU")
	private EntityManager em;

	public UserDAO() {
		// User Auto-generated constructor stub
	}
	ublic void create(User User) {
		em.persist(User);
	}

	@SuppressWarnings("unchecked")
	public List<User> all() {
		return em.createQuery("SELECT t FROM User t").getResultList();
	}

	public User findById(long id) {
		return em.find(User.class, id);
	}

	public void update(User User) {
		em.merge(User);
	}

	public EntityManager getEntityManager() {
		if (em == null) {
			EntityManagerFactory entityManagerFactory = Persistence
					.createEntityManagerFactory("UserPersist");
			em = entityManagerFactory.createEntityManager();
		}
		return em;
	}

	public void setEntityManager(EntityManager entityManager) {
		this.em = entityManager;
	}

	public void remove(Long id) {
		em.remove(em.find(User.class, id));
	}
}
