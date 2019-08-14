package com.revature.filter;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

public class GenericFilter<T> implements Specification<T> {
	//So java doesn't complain
	private static final long serialVersionUID = 1L;
	private SearchCriteria criteria;
 
    public GenericFilter(SearchCriteria criteria) {
		super();
		this.criteria = criteria;
	}

	@Override
    public Predicate toPredicate
      (Root<T> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
		//Checks operation passed by controller
		switch(criteria.getOperation().toLowerCase()) {
			case ">":
				//Returns a criteria queryBuilder with greater than or equal to clause
				return builder.greaterThanOrEqualTo(
			              root.<String> get(criteria.getKey()), criteria.getValue().toString());
			case "<":
				//Returns a criteria queryBuilder with less than or equal to clause
				return builder.lessThanOrEqualTo(
			              root.<String> get(criteria.getKey()), criteria.getValue().toString());
			case ":":
				//Returns a criteria queryBuilder with equal or like clause
				if (root.get(criteria.getKey()).getJavaType() == String.class) {
	                return builder.like(
	                  root.<String>get(criteria.getKey()), "%" + criteria.getValue() + "%");
	            } else {
	                return builder.equal(root.get(criteria.getKey()), criteria.getValue());
	            }
				//Returns a criteria queryBuilder with not like or not equal clause
			case "!":
				System.out.println("not equal");
				if (root.get(criteria.getKey()).getJavaType() == String.class) {
	                return builder.notLike(
	                  root.<String>get(criteria.getKey()), "%" + criteria.getValue() + "%");
	            } else {
	                return builder.notEqual(root.get(criteria.getKey()), criteria.getValue());
	            }
			default:
				return null;
		}
    }
}